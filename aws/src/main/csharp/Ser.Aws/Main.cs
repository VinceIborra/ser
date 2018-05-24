/*
 * Created by SharpDevelop.
 * User: vji
 * Date: 17/12/2017
 * Time: 2:48 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.IO;

using Spring.Context;
using Spring.Context.Support;
using Vji.Bob;

namespace Ser.Aws {

	public class Main {

		public string filecontents = "";
		public bool readline = false;
		private bool m_ShowFullMenus = false;
		public Form1 theForm;

        private IApplicationContext _context = null;

        public IApplicationContext context {
            get {
                if (this._context == null) {
                    this._context = new XmlApplicationContext("assembly://Ser.Aws/Ser.Aws/context.xml");
                }
                return this._context;
            }
        }

		//Called Before EA starts to check Add-In Exists
		public String EA_Connect(EA.Repository Repository) {
			//No special processing required.
			return "a string";
		}
		
		public object ProcessOperation(EA.Repository repository, object array) {
			string elementGuid = ((string[]) array)[0];
			EA.Project project = repository.GetProjectInterface();
			bool ret = project.GenerateClass (elementGuid, "overwrite=1");
			return "hello" + ret.ToString();
		}
		
		public bool EA_OnPostNewConnector(EA.Repository repository, EA.EventProperties info) {
			int count = info.Count;
			EA.EventProperty property = info.Get(0);
			string str = (string) property.Value;
			int connectorId = Convert.ToInt32(str);
			EA.Connector connector = repository.GetConnectorByID(connectorId);
			connector.Name = "vji";

            HelloAws aws = new HelloAws();
            string notes = aws.GetServiceOutput();
            connector.Notes = notes;

            connector.Update();
            
			return true;
		}

		//Called when user Click Add-Ins Menu item from within EA.
		//Populates the Menu with our desired selections.
		public object EA_GetMenuItems(EA.Repository Repository, string Location, string MenuName) {
			EA.Package aPackage = Repository.GetTreeSelectedPackage();
			switch( MenuName )
			{
				case "":
					return "-&AWSS";
				case "-&AWSS":
					string[] ar = { "&Tagged CSV Export", "Menu2", "About..." };
					return ar;
			}
			return "";
		}
		
		//Sets the state of the menu depending if there is an active project or not
		bool IsProjectOpen(EA.Repository Repository)
		{
			try
			{
				EA.Collection c = Repository.Models;
				return true;
			}
			catch
			{
				return false;
			}
		}

		//Called once Menu has been opened to see what menu items are active.
		public void EA_GetMenuState(EA.Repository Repository, string Location, string MenuName, string ItemName, ref bool IsEnabled, ref bool IsChecked)
		{
			if( IsProjectOpen(Repository) )
			{
                if (ItemName == "&Tagged CSV Export")
                    IsChecked = m_ShowFullMenus;
                else if (ItemName == "Menu2") {
                    IsChecked = m_ShowFullMenus;
                    //IsEnabled = m_ShowFullMenus;
                }
			}
			else
				// If no open project, disable all menu options
				IsEnabled = false;
		}

		//Called when user makes a selection in the menu.
		//This is your main exit point to the rest of your Add-in
		public void EA_MenuClick(EA.Repository Repository, string Location, string MenuName, string ItemName)
		{						
			switch( ItemName )
			{
				case "&Tagged CSV Export":	

					String writerString;
					String tagString;

					tagString = "";
					writerString = "";

					EA.Package aPackage;
					aPackage = Repository.GetTreeSelectedPackage();

					foreach(EA.Package thePackage in aPackage.Packages)
					{
						writerString = writerString + thePackage.Name.ToString() + "," + thePackage.ObjectType.ToString() + "\n";
						//MessageBox.Show(writerString);
						foreach(EA.Element theElements in thePackage.Elements)
						{
							foreach(EA.TaggedValue theTags in theElements.TaggedValues)
							{	
								tagString = tagString + theTags.Name.ToString() + "," + theTags.Value.ToString() + ",";
							}
							writerString = writerString + theElements.Name.ToString() + "," + theElements.ObjectType.ToString() + "," + tagString + "\n";
							tagString = "";
						}
					}

					foreach(EA.Element theElements in aPackage.Elements)
					{
						foreach(EA.TaggedValue theTags in theElements.TaggedValues)
						{	
							tagString = tagString + theTags.Name.ToString() + "," + theTags.Value.ToString() + ",";
						}
						writerString = writerString + theElements.Name.ToString() + "," + theElements.ObjectType.ToString() + "," + tagString;
						tagString = "";
					}

					
					// create a writer and open the file
					TextWriter tw = new StreamWriter("c:\\vji\\tmp\\" + aPackage.Name.ToString() + ".csv");

					// write a line of text to the file
					tw.WriteLine(writerString);

					// close the stream
					tw.Close();

					break;					

				case "Menu2":
                    IApplicationContext ctx = this.context;
					break;

				case "About...":
					Form1 anAbout = new Form1();
					anAbout.ShowDialog();					
					break;
			}
		}
		public bool readLine(StreamReader sreader)
		{
			bool answer;
			answer = false;
			
			try
			{
				filecontents = filecontents + "\n" + sreader.ReadLine();
			}
			catch
			{
				answer = true;
			}

			return answer;
		}
	}
}
		
		
	

