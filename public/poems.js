/*

  POEMS.JS
  Code to generate poems from APIs calls.
  
*/


let twitterText;
let twitterRandom;
const api = "https://content.guardianapis.com/search?"; 
const input = "format=json&section=world&from-date=2020-01-01&order-by=relevance&page-size=50";
const key = "&api-key=bfc6fce4-bee9-4930-b529-28bf07b4ca50";
let guardian;
let guardianText;
let guardianRandom;
const wikipedia = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&titles=2020&format=json"; // url for the content of wikipedia "2020" page
let wikiPage;
let wikiText;
let wikiRandom;


function getTweets() {
  loadJSON(/tweets/ + 
    // parameters for searching for tweets: specific word ("2020"), since march 2020, english language, filtering out retweets, hashtags, links and mentions
    '2020 since:2020-03-20 lang:en -filter:retweets -filter:hashtags -filter:links -filter:mentions',
    gotTweets); 
}

function gotTweets(tweets) {
  if (tweets.length == 0) { 
    console.log("Error while loading tweet! Try again in a few seconds.");
  }
  twitterRandom = Math.floor(Math.random() * tweets.length); 
  twitterText = tweets[twitterRandom].text;
}

function getGuardian() {
  loadJSON(api + input + key, gotNews); 
}

function gotNews(data) {
  guardian = data; 

  if (guardian) {
    guardianRandom = Math.floor(Math.random() * 50); // get a random news title from the loaded ones (total is 50)
    guardianText = guardian.response.results[guardianRandom].webTitle; // get only the titles
  }
}

function getWikipedia() {
  loadJSON(wikipedia, gotWiki, "jsonp");
}

function gotWiki(data) {
  wikiPage = data.query.pages['51396'].extract; // path to get the content of the page
}


function createPoem() { 
  // remove ponctuation from twitter text
  twitterText = RiTa.stripPunctuation(twitterText);
  // remove numbers, links "https://...", "…", and emojis
  let regexTwitter = /\d+|https.*|…|[^\w\s]/g; 
  twitterText = (twitterText.replace(regexTwitter, '.')).trim(); 
  twitterText = RiTa.stripPunctuation(twitterText);
  // split twitter text into arrays of words
  let twitterWords = RiTa.tokenize(twitterText);

  // fix words with abreviation
  for (let i = 0; i < twitterWords.length; i++) {
    if (twitterWords[i] == 'Im') {
      twitterWords[i] = twitterWords[i].replace("Im", "I'm");
    } else if (twitterWords[i] == 'im') {
      twitterWords[i] = twitterWords[i].replace("im", "I'm");
    } else if (twitterWords[i] == 'whos') {
      twitterWords[i] = twitterWords[i].replace("whos", "who's");
    } else if (twitterWords[i] == 'i') {
      twitterWords[i] = twitterWords[i].replace("i", "I");
    } else if (twitterWords[i] == 'Ive') {
      twitterWords[i] = twitterWords[i].replace("Ive", "I've");
    } else if (twitterWords[i] == 'youre') {
      twitterWords[i] = twitterWords[i].replace("youre", "you're");
    } else if (twitterWords[i] == 'aint') {
      twitterWords[i] = twitterWords[i].replace("aint", "ain't");
    } else if (twitterWords[i] == 'whats') {
      twitterWords[i] = twitterWords[i].replace("whats", "what's");
    } else if (twitterWords[i] == 'isnt') {
      twitterWords[i] = twitterWords[i].replace("isnt", "isn't");
    } else if (twitterWords[i] == 'dont') {
      twitterWords[i] = twitterWords[i].replace("dont", "don't");
    } else if (twitterWords[i] == 'didnt') {
      twitterWords[i] = twitterWords[i].replace("didnt", "didn't");
    } else if (twitterWords[i] == 'wont') {
      twitterWords[i] = twitterWords[i].replace("wont", "won't");
    } else if (twitterWords[i] == 'theyve') {
      twitterWords[i] = twitterWords[i].replace("theyve", "they've");
    } else if (twitterWords[i] == 'cant') {
      twitterWords[i] = twitterWords[i].replace("cant", "can't");
    } else if (twitterWords[i] == 'weve') {
      twitterWords[i] = twitterWords[i].replace("weve", "we've");
    } else if (twitterWords[i] == 'havent') {
      twitterWords[i] = twitterWords[i].replace("havent", "haven't");
    } else if (twitterWords[i] == 'shouldve') {
      twitterWords[i] = twitterWords[i].replace("shouldve", "should've");
    } else if (twitterWords[i] == 'hasnt') {
      twitterWords[i] = twitterWords[i].replace("hasnt", "hasn't");
    } else if (twitterWords[i] == 'wasnt') {
      twitterWords[i] = twitterWords[i].replace("wasnt", "wasn't");
    } else if (twitterWords[i] == 'theres') {
      twitterWords[i] = twitterWords[i].replace("theres", "there's");
    } else if (twitterWords[i] == 'dont') {
      twitterWords[i] = twitterWords[i].replace("dont", "don't");
    } else if (twitterWords[i] == 'doesnt') {
      twitterWords[i] = twitterWords[i].replace("doesnt", "doesn't");
    } else if (twitterWords[i] == 'arent') {
      twitterWords[i] = twitterWords[i].replace("arent", "aren't");
    } else if (twitterWords[i] == 'cant') {
      twitterWords[i] = twitterWords[i].replace("cant", "can't");
    } else if (twitterWords[i] == 'thats') {
      twitterWords[i] = twitterWords[i].replace("thats", "that's");
    } else if (twitterWords[i] == 'its') {
      twitterWords[i] = twitterWords[i].replace("its", "it's");
    } else if (twitterWords[i] == 'Its') {
      twitterWords[i] = twitterWords[i].replace("Its", "it's");
    } else if (twitterWords[i] == 'th') {
      twitterWords[i] = twitterWords[i].replace("th", "the");
    } else if (twitterWords[i] == 'lets') {
      twitterWords[i] = twitterWords[i].replace("lets", "let's");
    }
  }

  // remove ponctuation from guardian text
  guardianText = RiTa.stripPunctuation(guardianText);
  // split guardian text into arrays of words
  let guardianWords = RiTa.tokenize(guardianText);

  // remove "(b. " and "-" from wikipedia text
  let regexWiki = /[(]b.|-/g; 
  wikiPage = (wikiPage.replace(regexWiki, '.')).trim();
  wikiPage = RiTa.stripPunctuation(wikiPage);
  // split text into arrays of words
  let wikiWords = RiTa.tokenize(wikiPage);
  // get a random word from the array (excluding the "deaths" section)
  wikiRandom = Math.floor(Math.random() * 6201); 


  if (twitterWords[1] == undefined && twitterWords[2] == undefined) {
    twitterWords[1] = 'in';
    twitterWords[2] = '2020';
  } else if (twitterWords[1] == undefined) {
    twitterWords[1] = '2020';
  } else if (twitterWords[1].length > 25) {
    twitterWords[1] = 'in';
  } else if (twitterWords[2] == undefined) {
    twitterWords[2] = '2020';
  }

  // function to start the poem line with upper case letter
  let firstTwitterWord = twitterWords[0];
  let firstWikiWord = wikiWords[wikiRandom];
  
  function startSentence(word) {
    firstLetter = word[0].toUpperCase();
    firstWord = word.substr(1);
    return `${firstLetter}${firstWord}`;
  }

  // create poem (3 lines)
  // start with upper case letter and then remove first letter from the following word
  let poemLines = [
  `${startSentence(firstTwitterWord)} ${twitterWords[1]} ${twitterWords[2]}`,
  `${guardianWords[0]} ${guardianWords[1]} ${guardianWords[2]}`,
  `${startSentence(firstWikiWord)} ${wikiWords[wikiRandom+1]}.`];
  
  // randomize poem array order
  poemLines.sort();

  // join poem lines with tab space and add full stop
  poemText = poemLines.join("\n");
}
