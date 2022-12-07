# Team Members:

[![Anuj][linkedin-shield1]][contributors-url1]
[![Ayush][linkedin-shield2]][contributors-url2]
[![Sanket][linkedin-shield3]][contributors-url3]
[![Prakhar][linkedin-shield4]][contributors-url4]
[![Divy][linkedin-shield5]][contributors-url5]
[![Rohit][linkedin-shield6]][contributors-url6]


## The Project Presentation
[![Canva][canva-shield]][canva-url]

# Problem Statement:

# Scenario -  JSON Transformation

Create an application that will do below

## Code Generator
+ Accept a source JSON structure
+ Accept a target JSON structure
+ Accept a mapping (provided in a CSV format)
+ Build an app that will generate the code required to transform the source JSON structure to target JSON structure based on the mapping[***Key Feature***]
+ The generated code should preferably be Python or NodeJS.
+ If you are using any transformation libraries like JQ/JSONATA/JOLT to achieve the mapping and transformation, the application should auto generate the spec files needed for these libraries [***Key Feature***]
+ Application should be generic enough to accept different source/target/mapping inputs and dynamically arrive at the required code to do the conversion.

## Code Executor 

+ Maintain a list of mapping-specification or generated-code specification by name. 
+ Expose an REST API endpoint which will accept source_json and specification name as input. 
+ REST API should accept the source_json, apply the transformation dynamically based on the generated code and respond back with transformed json. 
+ Based on the inputs received, automatically pick up the generated code and execute the same. 
+ Output should be the intended transformed JSON. 
+ Even if the generated code is executed with different data of same JSON structure, the intended output should be achieved.


## Other Guidelines

### Input Data
+ Refer to the below path in repo for sample data
       
       - data
        |- sample_1
        |- sample_2
        |- sample_3
        
### Recommended Folder Structure
        - app_ui (for the UI files)
        - app (for the backend files)
        - presentation (to place working demo videos and presentation explaining the architecture of the app)

### Steps to submit the code
+ Fork the repo to your team's git repo.
+ Create a branch with your team name.
+ You can make the changes to your branch locally.
+ Create a file called TestMe.md and mention  how to start the app and if any dependencies have to be downloaded to run the app locally
+ Do not push the branch to the STG repo till instructed.
+ At the end of the event, you can push your branch into the STG repo.

***Try not to use firebase or any internet provided services for creating or running the apps***


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield1]: https://img.shields.io/static/v1?label=&message=Anuj&color=black&style=for-the-badge&logo=linkedin
[linkedin-shield2]: https://img.shields.io/static/v1?label=&message=Ayush&color=black&style=for-the-badge&logo=linkedin
[linkedin-shield3]: https://img.shields.io/static/v1?label=&message=Sanket&color=black&style=for-the-badge&logo=linkedin
[linkedin-shield4]: https://img.shields.io/static/v1?label=&message=Prakhar&color=black&style=for-the-badge&logo=linkedin
[linkedin-shield5]: https://img.shields.io/static/v1?label=&message=Divy&color=black&style=for-the-badge&logo=linkedin
[linkedin-shield6]: https://img.shields.io/static/v1?label=&message=Rohit&color=black&style=for-the-badge&logo=linkedin
[canva-shield]: https://img.shields.io/static/v1?label=&message=Click-Here&color=black&style=for-the-badge&logo=Canva
[contributors-url1]: https://www.linkedin.com/in/awasthi-anuj/
[contributors-url2]: https://github.com/ayushbhaimehta
[contributors-url3]: https://www.linkedin.com/in/sanket-kumar-singh-b698191b8/
[contributors-url4]: https://www.linkedin.com/in/prakhartomar53/
[contributors-url5]: https://www.linkedin.com/in/divy-goyal/
[contributors-url6]: https://www.linkedin.com/in/rohitbishla/
[canva-url]: https://www.canva.com/design/DAFTILlf_XE/UVbaZyQnBFmsyjjHRuuNgQ/view?utm_content=DAFTILlf_XE&utm_campaign=designshare&utm_medium=link&utm_source=publishpresent
