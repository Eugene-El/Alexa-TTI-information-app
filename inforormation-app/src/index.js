 let speechOutput;
 let reprompt;
 const welcomeOutput = "I can tell you information about TTI";
 const instituteInformation = "Transport and telecommunication institute – is a modern university with the almost centennial history. TTI – is the university-successor of the legendary RKIIGA (Riga Red-Banner Civil Aviation Institute) and RAU (Riga Aviation Institute).";
 const instituteMission = "Mission of TTI – combination of classic university traditions and innovative technologies, exact sciences and creative approach.";
 const instituteReason = "Learn what is relevant! TTI offers study programs in the most sought after fields. Get a respectable diploma! TTI issues state diplomas, which are recognized both in Europe and all around the world. Since 2005, the Institute issues a „Diploma Supplement” approved by the European Commission – it is a document confirming the recognition of the European quality of academic and professional programs of our institution of the higher education. Pay less! Flexible discount system allows many students to pay less for their tuition. Travel around Europe! Thanks to the ERASMUS+ program, you can study or take an internship for one semester in one of the partnership universities of TTI or at specialized companies in other countries of the European Union. Have fun with your friends! Student life at TTI is a series of bright and exciting events! Join us! Get scholarship! Citizens from countries which have signed an Agreement on co-operation in education and science can apply for Latvian goverment scholarships.";



'use strict';
const Alexa = require("alexa-sdk");
const Opn = require("opn");
const APP_ID = "amzn1.ask.skill.bc4fc65f-f9aa-456f-9d90-6f8258830bf4";  // TODO replace with your app ID (OPTIONAL).

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
    	this.response.speak(welcomeOutput);
        this.emit(':responseReady');
    },
    'InstituteInformationIntent': function () {
    	this.response.speak(instituteInformation);
        this.emit(':responseReady');
    },
    'InstituteMissionIntent': function () {
    	this.response.speak(instituteMission);
        this.emit(':responseReady');
    },
    'InstituteReasonIntent': function () {
    	this.response.speak(instituteReason);
        this.emit(':responseReady');
    },
    'InstituteSiteIntent': function () {
    	this.response.speak('Open tsi.lv');
        Opn("https://www.tsi.lv");
        this.emit(':responseReady');
    },
    'InstituteSiteProgrammsIntent': function () {
    	this.response.speak('I will show avaliable study programmes in TTI');
        Opn("https://www.tsi.lv/en/content/study-programmes");
        this.emit(':responseReady');
    },
    'InstituteProgrammsIntent': function () {

        var filledSlots = delegateSlotCollection.call(this);
        
        var speechOutput = "";

        console.log(this.event.request.intent.slots.Faculty.value);

        switch(this.event.request.intent.slots.Faculty.value)
        {
			case "computer science and telecommunications":
			speechOutput = 'In the field of "Computer Science", specialists are trained in software and information systems that provide the development and application of modern computer technologies in a wide range of areas of human activity. Specialists of this area operate with modern tools and methods of program development, such as visual modeling, object-oriented and component-oriented programming decompositions, progressive environments and technologies. Such specialists should know the computer hardware, data transmission over the networks and the latest software.';
			break; 

			case "transport and logistics":
			speechOutput = 'Faculty of Transport and Logistics offers the following study programmes: Bachelor of engineering science in Theoretical engineering (Transport Commercial Operation), Higher Professional Bachelor Study Programme "Transport and Business Logistics", Bachelor of Engineering Science in Aviation Transport (pilot), Master of Social Sciences in Transport and Logistics, Technical Maintenance of Aircraft Transport, Bachelor of engineering science in Aviation Transport';
			break;

			case "economics and management":
			speechOutput = 'These programmes provide knowledge, skills and competences in various functional areas of business management, including entrepreneurship, marketing, human resources and finances at the age of globalization. The students of the programme “Bachelor of Social Science in Management” will learn to understand the customer needs, work out strategies and policy aimed at the implementation of organisational goals and objectives of the enterprise, develop a business plan to implement their own business ideas. The curriculum provides a platform for further in-depth post graduate study of management. The programme “Master of Social Science in Management” is the emphasis on the development of students’ analytical and research skills and the acquisition of professional counselling skills in a modern organization management. ';
			break;
        }
        
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'This is the information app about TTI';
        const reprompt = '';

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('See you later!');
        this.emit(':responseReady');
    }
};


exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}
