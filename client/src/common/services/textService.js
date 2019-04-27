angular.module('myApp')

.factory('TextService', ['$rootScope', '$cookies', 'ConstValuesService',
function ($rootScope, $cookies, ConstValuesService) {
	var dictionary = {};

	var romanianDictionary = {

	"index.title" 				: "Tema13",
	"index.toolbar" 			: "Meniu",
	"index.devicesLinkDisplay" 	: "Rezervarile mele",
	"index.author" 				: "Postat de: mine",
	"index.contact" 			: "Contact:...",
	"index.header" 				: "Bine ai venit!",
	"index.language"			: "Engleza",

  "errorMessage"  : "Uups! Se pare ca a fost o eroare.",

  	"home.homeText" : "Esti 'Acasa'. Wowww!",

  	"login.loginText"  			: "Introdu token-ul de loghin:",
  	"login.loginButtonDisplay"  : "Logheaza-te",
    "login.loginPassword"        : "Parola",
    "login.loginNewAccount"       : "Cont nou",
  	"devices.showDeviceDetailsButton" 	: "Detalii dispozitiv",

  	"details.deviceTypeText"  			: "Tip dispozitiv: ",
	"details.deviceOsText" 				: "SO dispozitiv: ",
	"details.deviceMacText"  			: "Mac dispozitiv: ",
	"details.deviceIdText" 				: "Id dispozitiv: ",
	"details.deviceAgentStatusText"  	: "Status agent dispozitiv: ",
	"details.deviceHttpsScanText"  		: "Https scan dispozitiv: "
	
	};

	var englishDictionary = {

	"index.title" 				: "Homework13",
	"index.toolbar" 			: "Meniu",
	"index.devicesLinkDisplay" 	: "My rezervations",
	"index.author" 				: "Posted by: me",
	"index.contact" 			: "Contact:...",
	"index.header" 				: "Welcome!",
	"index.language"			: "Romanian",

  "errorMessage"  : "Oops! There was an error.",

  	"home.homeText" : "You are on the 'Home' page. Wowww!",

  	"login.loginText"  			: "Enter login token:",
  	"login.loginButtonDisplay"  : "Login",
    "login.loginPassword"        : "Password",
    "login.loginNewAccount"       : "New Account",

  	"devices.showDeviceDetailsButton" 	: "Show details",
  	
  	"details.deviceTypeText"  			: "Device type: ",
	"details.deviceOsText" 				: "Device os: ",
	"details.deviceMacText"  			: "Device mac: ",
	"details.deviceIdText" 				: "Device id: ",
	"details.deviceAgentStatusText"  	: "Device agent status: ",
	"details.deviceHttpsScanText"  		: "Device https scan: "
	
	};

	this.getTextById = function (id) {
  		return dictionary[id];
  	};

  	this.changeLanguage = function (language) {
        if (language === "Romanian") {
        	$cookies.put(ConstValuesService.languageCookieName, "ro_RO");
        	dictionary = romanianDictionary;
        } else if (language === "Engleza") {
        	$cookies.put(ConstValuesService.languageCookieName, "en_US");
        	dictionary = englishDictionary;
        }
  	};

  	this.initLanguage = function () {
  		var languageCookie = $cookies.get(ConstValuesService.languageCookieName);
        if (languageCookie === undefined) {
            this.changeLanguage("Romanian");      
        } else {
        	if (languageCookie === "ro_RO") {
        		dictionary = romanianDictionary;
        	} else if (languageCookie === "en_US") {
        		dictionary = englishDictionary;
        	}
        }
  	};

  	return {
  		getTextById : this.getTextById,
  		changeLanguage : this.changeLanguage,
  		initLanguage : this.initLanguage
  	};
}]);
