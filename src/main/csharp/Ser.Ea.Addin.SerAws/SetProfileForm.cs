using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using Amazon.Runtime.CredentialManagement;

using Ser.Aws;

namespace Ser.Ea.Addin.SerAws {
    public partial class SetProfileForm : Form {

        public AwsClient AwsClient { set; get; } = null;

        private List<CredentialProfile> _credentialProfileList = null;

        private List<CredentialProfile> credentialProfileList {
            get {
                if (this._credentialProfileList == null) {
                    var chain = new CredentialProfileStoreChain();
                    this._credentialProfileList = chain.ListProfiles();
                }
                return this._credentialProfileList;
            }
            set { this._credentialProfileList = value; }
        }

        private CredentialProfile _chosenProfile = null;

        private CredentialProfile chosenProfile { get => _chosenProfile; set => _chosenProfile = value; }

        public SetProfileForm() {
            InitializeComponent();
        }

        private void reloadProfileList() {

            // Force retrieval of profiles
            this.credentialProfileList = null;

            // Load up the list with the available profiles - Add any new ones
            foreach (CredentialProfile profile in this.credentialProfileList) {
                if (!this.profilesListBox.Items.Contains(profile.Name)) {
                    this.profilesListBox.Items.Add(profile.Name);
                }
            }

            // Take off any that aren't in the profil list
            for (int jdx=0; jdx<this.profilesListBox.Items.Count; jdx++) {

                // Try to match string in listbox against profile
                string name = this.profilesListBox.Items[jdx].ToString();
                var found = false;
                for (int idx = 0; idx< this.credentialProfileList.Count && !found; idx++) {
                    if (this.credentialProfileList[idx].Name == name) {
                        found = true;
                    }
                }

                // If not found, remove from listbox
                if (!found) {
                    this.profilesListBox.Items.Remove(name);
                }
            }
        }

        private void SetProfileForm_Shown(Object sender, EventArgs e) {

            // Set button state appropriately
            this.clearButton.Enabled = false;  // Nothing to clear. yet
            this.newButton.Enabled = true;     // User may enter a new one at any time
            this.updateButton.Enabled = false; // Nothing to update, yet
            this.okButton.Enabled = false;     // User hasnt chosen anything yet
            this.cancelButton.Enabled = true;  // User can cancel out, at any time

            // Load profile list box
            this.reloadProfileList();
        }

        private void SetProfileForm_FormClosing(Object sender, FormClosingEventArgs e) {

            // Nothing to do if no profile has been chosen
            if (this.chosenProfile == null) {
                return;
            }

            // Set selected profile if ok
            if (this.DialogResult.Equals(DialogResult.OK)) {
                this.AwsClient.credentialProfile = this.chosenProfile;
            }
        }

        private void newButton_Click(Object sender, EventArgs e) {

            // Clear the profile details textboxes
            this.nameTextBox.Clear();
            this.accessKeyIdTextBox.Clear();
            this.secretAccessKeyTextBox.Clear();

            // Make sure nothing is selected from the list box
            this.profilesListBox.ClearSelected();

            // Set button state appropriately
            this.clearButton.Enabled = true;   // User can clear details
            this.deleteButton.Enabled = false; // User can only delete, after update
            this.updateButton.Enabled = true;  // User can hit the update button, once they've entered the relevant details.
            this.okButton.Enabled = false;     // User can only ok the choice, after update
        }

        private void deleteButton_Click(Object sender, EventArgs e) {

            // Nothing to delete, if nothing selected
            if (this.profilesListBox.SelectedIndex < 0) {
                return;
            }

            // Unregister the selected profiel
            var netSDKFile = new NetSDKCredentialsFile();
            netSDKFile.UnregisterProfile(this.profilesListBox.SelectedItem.ToString());

            // Clear the text boxes
            this.nameTextBox.Clear();
            this.accessKeyIdTextBox.Clear();
            this.secretAccessKeyTextBox.Clear();

            // Reset listbox
            this.reloadProfileList();

            // And set the button states as appropriate
            this.clearButton.Enabled = false;  // Nothing to clear, if nothing selected
            this.deleteButton.Enabled = false; // User can only delete, after a selection
            this.updateButton.Enabled = false; // User can only update, after a selection or a new
            this.okButton.Enabled = false;     // User can only ok the choice, after a selection
        }

        private void updateButton_Click(Object sender, EventArgs e) {

            // Get the values of the profile
            string nameStr = this.nameTextBox.Text;
            string accessKeyIdStr = this.accessKeyIdTextBox.Text;
            string secretAccessKeyStr = this.secretAccessKeyTextBox.Text;

            // Match against the current list in the listbox
            bool found = false;
            for (int idx = 0; idx < this.profilesListBox.Items.Count && !found; idx++) {
                if (this.profilesListBox.Items[idx].Equals(nameStr)) {
                    found = true;
                }
            }

            // Create new profile for the updated details
            var options = new CredentialProfileOptions {
                AccessKey = accessKeyIdStr,
                SecretKey = secretAccessKeyStr
            };
            var profile = new Amazon.Runtime.CredentialManagement.CredentialProfile(nameStr, options);
            //profile.Region = RegionEndpoint.USWest1;
            var netSDKFile = new NetSDKCredentialsFile();
            netSDKFile.RegisterProfile(profile);

            // Reset listbox
            this.reloadProfileList();

            // And select the newly created one
            this.profilesListBox.SelectedIndex = this.profilesListBox.Items.IndexOf(nameStr);

            // NB - No need to set the button state - it will be done by the selection event handler
        }

        private void profilesListBox_SelectedIndexChanged(Object sender, EventArgs e) {

            // Nothing to do if nothing selected
            if (this.profilesListBox.SelectedItem == null) {
                return;
            }

            // Get the selected profile name
            string currentItemStr = profilesListBox.SelectedItem.ToString();

            // Match against the know list of credentials
            CredentialProfile matchedProfile = null;
            for (int idx = 0; idx < this.credentialProfileList.Count && matchedProfile == null; idx++) {
                if (this.credentialProfileList[idx].Name == currentItemStr) {
                    matchedProfile = this.credentialProfileList[idx];
                }
            }

            // Nothing further to do if we can't find a match
            if (matchedProfile == null) {
                return;
            }

            // Display profile attributes
            this.nameTextBox.Text = matchedProfile.Name;
            this.accessKeyIdTextBox.Text = matchedProfile.Options.AccessKey;
            this.secretAccessKeyTextBox.Text = matchedProfile.Options.SecretKey;

            // Set the selected profile
            this.chosenProfile = matchedProfile;

            // Set button state accordingly
            this.clearButton.Enabled = true;  // User may clear selected values
            this.deleteButton.Enabled = true; // User may delete selected choice
            this.updateButton.Enabled = true; // User may update the selected values
            this.okButton.Enabled = true;     // User may ok the selected choice
        }
    }
}
