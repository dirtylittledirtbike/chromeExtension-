const toneanalyzerapikey = "kHNqXdZWxluLI3upgclMCRNapSmUWQaB95mAlZeIcCKZ";

const translatorapikey = "taQJn2kCUvtbiWl8GFGRNVC_r39txDSIArNR2lCcEiew";
//const toneanalyzerapikey = "bLF21kTqxCgtS4mYrNeEQETUUtdbGbiuEiu36U0JUwva";
var txt = "The score that is returned lies in the range of 0 to 1. A score less than 0.5 indicates that the tone is unlikely to be perceived in the content, a score greater than 0.75 indicates a high likelihood that the tone is perceived.";

function getAPIKeyV2(apikey){
  return new Promise(function(resolve, reject){
  var xmlRequest = new XMLHttpRequest();
     if(window.XMLHttpRequest){
       xmlRequest.open("POST", "https://iam.bluemix.net/identity/token")
       xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       xmlRequest.setRequestHeader("Accept", "application/json")

       xmlRequest.send(encodeURI("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey="+apikey));

       xmlRequest.onreadystatechange = function(){

         if(xmlRequest.readyState ==4 && xmlRequest.status==200) {

             var parsedData = JSON.parse(xmlRequest.responseText)

             resolve (parsedData.access_token);
         }
     }

     }

  });

}

 var callToneAnalyzer = function (word) {
 var textContent = String(word.selectionText);

 var xhr = new XMLHttpRequest();
 var toneanalyzertoken = getAPIKeyV2(toneanalyzerapikey);
 toneanalyzertoken.then(function(result){
 var inputContent = textContent.replace(/%20/g, "");
 xhr.open("GET", "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?sentences=true&version=2016-05-19&text="+inputContent)
 xhr.setRequestHeader("Authorization", "Bearer "+result);
 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 xhr.setRequestHeader("Accept", "application/json")

 xhr.send();

 xhr.onreadystatechange = function(){
 if(xhr.readyState == 4 && xhr.status==200){
 var result1 = xhr.responseText;

 var obj = JSON.parse(result1);

 var fulltone  = obj.document_tone.tone_categories;

 var analyticalTone = obj.document_tone.tone_categories[1].tones[0].tone_name;
 var analyticalScore = obj.document_tone.tone_categories[1].tones[0].score;

 var confidentTone = obj.document_tone.tone_categories[1].tones[1].tone_name;
 var confidentScore = obj.document_tone.tone_categories[1].tones[1].score;

 var tentativeTone = obj.document_tone.tone_categories[1].tones[2].tone_name;
 var tentativeScore = obj.document_tone.tone_categories[1].tones[2].score;

 //var opennessTone = obj.document_tone.tone_categories[2].tones[0].tone_name;
 //var opennessScore = obj.document_tone.tone_categories[2].tones[0].score;

// var conscientiousnessTone = obj.document_tone.tone_categories[2].tones[1].tone_name;
// var conscientiousnessScore = obj.document_tone.tone_categories[2].tones[1].score;

// var extraversionTone = obj.document_tone.tone_categories[2].tones[2].tone_name;
 //var extraversionScore = obj.document_tone.tone_categories[2].tones[2].score;

 //var agreeablenessTone = obj.document_tone.tone_categories[2].tones[3].tone_name;
 //var agreeablenessScore = obj.document_tone.tone_categories[2].tones[3].score;

 var angerTone = obj.document_tone.tone_categories[0].tones[0].tone_name;
 var angerScore = obj.document_tone.tone_categories[0].tones[0].score;

 var disgustTone = obj.document_tone.tone_categories[0].tones[1].tone_name;
 var disgustScore = obj.document_tone.tone_categories[0].tones[1].score;

 var fearTone = obj.document_tone.tone_categories[0].tones[2].tone_name;
 var fearScore = obj.document_tone.tone_categories[0].tones[2].score;

 var joyTone = obj.document_tone.tone_categories[0].tones[3].tone_name;
 var joyScore = obj.document_tone.tone_categories[0].tones[3].score;

 var sadnessTone = obj.document_tone.tone_categories[0].tones[4].tone_name;
 var sadnessScore = obj.document_tone.tone_categories[0].tones[4].score;


  alert("Linguistic-Tone Scores:" + "\n" + analyticalTone  + "=  " + analyticalScore + "\n" + confidentTone  + "=  " + confidentScore + "\n" + tentativeTone  + "=  " + tentativeScore + "\n" + "\n" + "Emotive-Tone Scores:" + "\n" + angerTone  + "=  " + angerScore + "\n" +  disgustTone + "= "  + disgustScore + "\n" + fearTone + "= " + fearScore + "\n" + joyTone + "= " + joyScore + "\n" + sadnessTone  + "= " + sadnessScore + "\n" + "\n" + txt);
  //agreeablenessTone  + "=  " + agreeablenessScore + "\n" +
     }
 }
 })

};

function Translator(word, lang, langname) {
    var textContent = String(word.selectionText);

    var accesstoken = getAPIKeyV2(translatorapikey);

    accesstoken.then(function(result){
     var inputContent = textContent.replace(/%20/g, " ");
     var xmlRequest = new XMLHttpRequest();

     if(window.XMLHttpRequest){

     xmlRequest.open("POST", "https://gateway.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01")
     xmlRequest.setRequestHeader("Authorization", "Bearer "+ result);
     xmlRequest.setRequestHeader("Content-type", "application/json");
     xmlRequest.setRequestHeader("Accept", "application/json");
     var data = {
         "text": inputContent,
         "source": "en",
         "target": String(lang)
     }
     xmlRequest.send(JSON.stringify(data));

 xmlRequest.onreadystatechange = function() {
     if(xmlRequest.readyState ==4 && xmlRequest.status==200){
         var translatedtext = JSON.parse(xmlRequest.responseText);
         alert("Translated to " + langname + "\n" + JSON.stringify(translatedtext.translations));
     }
 }

    }
})
}


function generalTranslator(word) {

    var childname = word.menuItemId;

    if (childname == 'child1') {
        Translator(word, 'es', 'Spanish');
        return;
    }
  //  if (childname == 'child2') {
  //      Translator(word, 'ar', 'Arabic');
  //      return;
  //  }
    if (childname == 'child2') {
        Translator(word, 'fr', 'French');
        return;
    }
  //  if (childname == 'child4') {
    //    Translator(word, 'pt', 'Portuguese');
    //    return;
  //  }
    if (childname == 'child3') {
        Translator(word, 'de', 'German');
        return;
    }
}

chrome.contextMenus.create({
    title: "IBM Watson API V1",
    id: 'parent',
    contexts: ["selection"]
});

chrome.contextMenus.create({
   title: "Translate to Spanish",
   parentId: "parent",
   id: "child1",
   contexts: ["selection"],
   onclick: generalTranslator
});

//chrome.contextMenus.create({
  //  title: "Translate to Arabic",
  //  parentId: "parent",
  //  id: "child2",
  //  contexts: ["selection"],
  //  onclick: generalTranslator
//});

chrome.contextMenus.create({
    title: "Translate to French",
    parentId: "parent",
    id: 'child2',
    contexts: ["selection"],
    onclick: generalTranslator
});

//chrome.contextMenus.create({
//    title: "Translate to Portuguese",
//    parentId: "parent",
//    id: 'child4',
  //  contexts: ["selection"],
//    onclick: generalTranslator
//});

chrome.contextMenus.create({
    title: "Translate to German",
    parentId: "parent",
    id: 'child3',
    contexts: ["selection"],
    onclick: generalTranslator
});

chrome.contextMenus.create({
    title: "Tone Analyzer",
    parentId: "parent",
    id: 'child4',
    contexts: ["selection"],
    onclick: callToneAnalyzer
});
