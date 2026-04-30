# time-management-app
Single-page web application that visualises time spent across activities using JSON data, tracks goals, and supports self-management through iterative Agile development.

## How to Run the Application 

Option 1:
- Open the project in Visual Studio Code
- Use the Live Server extension 

Option 2: 
- Open index.htm directly in a browser
- The application will use fallback data if JSON loading fails

## Technologies Used
- HTML
- CSS (Bootstrap)
- JavaScript
- Node.js (for module handling)
- JSON (file input/output)

## Project Structure
- `/data` -JSON input and output files
- `/js` - Application logic
- `/css` - Styling
- `/docs` -UML diagrams and documentation

## Development Approach
The project follows an Agile development approach with iterative sprints

## Development Log 
### Sprint 1 Week 1
At the start of Phase 2, the GitHub repository was set up locally on windows using GitHub Desktop and Visual Studio Code. The sprint focused on establishing the project foundation to support iterative development.

**Sprint Goals:**
- Create and configure the GitHub repository
- Establish a clear project folder structure 
- Define the intial JSON data model 
- Create the single-page HTML entry point

**Completed Tasks:** 
- GitHub repository created and cloned locally 
- README documentation expanded 
- Initial project structure implemented
- JSON input file created for time-tracking data
- Placeholder HTML, JavaScript, and CSS files added

This sprint established the technical and organisational foundation required for subsequent implementation sprints

### Sprint 2 - Working Prototype 

This sprint focused on implementing a functional single-page prototype based on the project requirements.

**Sprint Goals:**
- Load time-tracking data from a JSON file
- Visually display time spent across activities
- Implement goal checking with feedback
- Export a summary as a JSON flat file

**Completed Tasks:**
- JSON input loaded using JavaScript fetch
- Activity data displayed using progress bars
- Productive and leisure hours calculated using rule-based logic
- Goal checking implemented with user feedback
- Summary JSON exported as a downloadable file 
- Application tested locally using VS Code Live Server

This sprint resulted in a fully working prototype.

### Sprint 3 - Started Final Report


This sprint focused on setting up the final report 



**Sprint Goals:**
- Create report document
- Start the introduction
- Document development progress so far
- Prepare the foundation for remaining report sections


**Completed Tasks:**
- Created the final project report document
- Drafted the introduction and project overview
- Documented SDLC approach and development workflow
- Recorded sprint history and development milestones

### Sprint 4 - Final Product Enhancement and User Input Intergration 

This sprint focuses on refining the application and enhancing its interactivity by introducing user input functionality alongside the existing JSON-based system. 

**Sprint Goals**
- Implement manual user input for activity data
- Allow users to define their own daily goal
- Integrate user input with existing application logic
- Improve validation 

**Completed Tasks** 
- Manual input form created for entering activity hours (Study, Work, Exercise, Leisure)
- Goal input field intergrated into the interface
- User input converted into a structured timeData object
- Input validation implemented to prevent invalid or missing values 
- Application updated to process both JSON file input and manual consistently 
- UI feedback improved with clearer status messages and alerts
- Activity rendering and totals calculation extended to support user-entered data
- Final system tested to ensure all features (load, input, goal checking, export work together)