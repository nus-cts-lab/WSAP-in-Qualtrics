Qualtrics.SurveyEngine.addOnload(function () {

  // Retrieve Qualtrics object and save in qthis
  var qthis = this;

  // Hide buttons
  qthis.hideNextButton();

  // Defining and load required resources
  var jslib_url = "https://lhw-1.github.io/jspsych-6.3.1/";
  var requiredResources = [
    jslib_url + "jspsych.js",
    jslib_url + "plugins/jspsych-html-keyboard-response.js"
  ];

  function loadScript(idx) {
    console.log("Loading ", requiredResources[idx]);
    jQuery.getScript(requiredResources[idx], function () {
      if ((idx + 1) < requiredResources.length) {
        loadScript(idx + 1);
      } else {
        initExp();
      }
    });
  }

  if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
    loadScript(0);
  }

  // Append the display_stage Div using jQuery
  // jQuery is loaded in Qualtrics by default
  jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
  jQuery("<div id = 'display_stage'></div>").appendTo('body');


  // Wrap jsPsych.init() in a function
  function initExp() {

    /* EXPERIMENT VARIABLES */

    // Fisher-Yates Algorithm for Random Shuffling of Arrays
    const shuffleArray = arr => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    // Practice Scenarios for the experiment
    var practice_stimuli = [
      { stimulus: "The waiter brought your ______ to the table.", words: ["appetiser", "tiger"], labels: ["practice0", "practice1"] },
      { stimulus: "Micah was volunteering at an animal shelter. The dog he was feeding suddenly bit him. The dog was _____.", words: ["angry", "frightened"], labels: ["practice0", "practice1"] },
      { stimulus: "An old man is reading the _____.", words: ["newspaper", "table"], labels: ["practice0", "practice1"] },
      { stimulus: "You are feeling tired from three days of camping. When you get home, you _____.", words: ["sleep", "shower"], labels: ["practice0", "practice1"] },
      { stimulus: "Yesterday, you hung a picture up on the _____.", words: ["wall", "tree"], labels: ["practice0", "practice1"] },
    ];
    shuffleArray(practice_stimuli);

    // Scenarios for the experiment
    var stimuli = [
      { stimulus: "You have made an appointment to see your doctor to discuss your test results. You think the results will probably show you are _____.", words: ["fine", "ill"], labels: ["benign", "health-threat"] },
      { stimulus: "You take a pill every morning at breakfast. The pill is a _____.", words: ["vitamin", "medicine"], labels: ["benign", "health-threat"] },
      { stimulus: "It is 10am on a Monday and you are still in bed. You are at home because you have a _____.", words: ["holiday", "cold"], labels: ["benign", "health-threat"] },
      { stimulus: "You feel weak and your stomach is making noises. You are _____.", words: ["hungry", "sick"], labels: ["benign", "health-threat"] },
      { stimulus: "You are lying on the couch. Your body is heavy and your eyes are closing. You are _____.", words: ["tired", "unwell"], labels: ["benign", "health-threat"] },
      { stimulus: "You begin to breath heavily. Your chest is quickly going up and down. You are _____.", words: ["exercising", "asthmatic"], labels: ["benign", "health-threat"] },
      { stimulus: "There are many people at the gathering. Your best friend’s mother and father are crying. Your best friend _____.", words: ["has died", "has married"], labels: ["benign", "health-threat"] },
      { stimulus: "The man’s forehead is sweaty. His heart is pounding, and he is breathing deeply because of _____.", words: ["heart attack", "running"], labels: ["benign", "health-threat"] },
      { stimulus: "John continues to cough heavily. He has had this problem for a while. This condition is sometimes accompanied by pain. His cough is caused by ____.", words: ["smoking", "lung cancer"], labels: ["benign", "health-threat"] },
      { stimulus: "The film actor is nauseous and vomits frequently. Also, his responses to the words of the other actor are slow. He is _____.", words: ["drunk", "poisoned"], labels: ["benign", "health-threat"] },
      { stimulus: "You see a woman on the street. It takes a lot of effort for her to cross the curb. It is difficult to cross the curb with a ______.", words: ["baby stroller", "wheelchair"], labels: ["benign", "health-threat"] },
      { stimulus: "You fell while you were walking. When you stood up, you felt as if your knee was wet. Your knee was ____.", words: ["muddy", "bloody"], labels: ["benign", "health-threat"] },
      { stimulus: "You are talking to a skier. He competed in various international competitions. In one of the matches, he broke his _____.", words: ["record", "leg"], labels: ["benign", "health-threat"] },
      { stimulus: "You saw your old friend after a long time. Surprisingly, he is completely bald. He told you that his baldness is because of his ______.", words: ["acting makeup", "chemotherapy"], labels: ["benign", "health-threat"] },
      { stimulus: "A woman is coming toward you, and she is trying to keep her balance. This is because walking with _____ is very difficult. ", words: ["high heels", "a cane"], labels: ["benign", "health-threat"] },
      { stimulus: "Yesterday, you collided with a car while riding a bicycle. You cannot ride a bicycle anymore because you broke your _____ in the accident. ", words: ["bike", "leg"], labels: ["benign", "health-threat"] },
      { stimulus: "You are feeling symptoms of a flu and you have gone to hospital for a COVID-19 diagnostic test. You will be meeting your doctor today to discuss the test results. You think the results will probably show you have tested _____.", words: ["negative for COVID-19", "positive for COVID-19"], labels: ["benign", "health-threat"] },
      { stimulus: "You are in a restaurant and the person sitting at the table next to yours is having a runny nose. You believe he is _____.", words: ["allergic", "infected"], labels: ["benign", "health-threat"] },
      { stimulus: "You went to visit a friend in hospital. When you entered the Accident and Emergency Department (A&E) you bumped into someone. This person is (a) _____.", words: ["relative", "pneumonic"], labels: ["benign", "health-threat"] },
      { stimulus: "Your friend asks you out for dinner, but you suggest a postponement and explain that it is because of _____.", words: ["unavailability", "epidemic"], labels: ["benign", "health-threat"] },
      { stimulus: "You feel an itch in your throat. This itch is due to a _____.", words: ["chili pepper", "sore throat"], labels: ["benign", "health-threat"] },
      { stimulus: "Tracy started to feel itchy and noticed red spots on her arms. Tracy has _____.", words: ["mosquito bites", "hives"], labels: ["benign", "health-threat"] },
      { stimulus: "You came home and noticed that your body feels very warm. This is due to the/a _____.", words: ["weather", "fever"], labels: ["benign", "health-threat"] },
      { stimulus: "Celeste suddenly felt very cold. She needs a ____.", words: ["jacket", "doctor"], labels: ["benign", "health-threat"] },
      { stimulus: "After coming back from the zoo, Isaac washed his hands thoroughly to rid himself of ______.", words: ["mud", "germs"], labels: ["benign", "health-threat"] },
      { stimulus: "You hear a noise in the night. It is from a _____.", words: ["dog", "robber"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend comments on your behaviour. She _____ of how you acted.", words: ["approves", "disapproves"], labels: ["benign", "anxiety"] },
      { stimulus: "You have not seen your family in a while because of _____.", words: ["travelling", "conflict"], labels: ["benign", "anxiety"] },
      { stimulus: "Your date is not here yet because of _____.", words: ["traffic", "no-show"], labels: ["benign", "anxiety"] },
      { stimulus: "There is a change in your salary. You are getting a _____.", words: ["raise", "pay cut"], labels: ["benign", "anxiety"] },
      { stimulus: "You finish last of everyone on a test. You are _____.", words: ["cautious", "stupid"], labels: ["benign", "anxiety"] },
      { stimulus: "Your boss wants to meet you to _____ you.", words: ["praise", "criticise"], labels: ["benign", "anxiety"] },
      { stimulus: "People laugh after something you said. You said something _____.", words: ["funny", "embarrassing"], labels: ["benign", "anxiety"] },
      { stimulus: "A friend does not respond when you wave hello because she is _____.", words: ["distracted", "mad"], labels: ["benign", "anxiety"] },
      { stimulus: "Your date has to leave early. Your date is _____.", words: ["busy", "bored"], labels: ["benign", "anxiety"] },
      { stimulus: "You carry a tray of food to a party. You are _____.", words: ["graceful", "clumsy"], labels: ["benign", "anxiety"] },
      { stimulus: "The instructor asked the class to form into groups. You are certain you will be picked _____.", words: ["first", "last"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend is not replying to your messages. Your friend is _____.", words: ["occupied", "upset"], labels: ["benign", "anxiety"] },
      { stimulus: "You have a big presentation tomorrow. You cannot sleep because you are _____.", words: ["excited", "unprepared"], labels: ["benign", "anxiety"] },
      { stimulus: "You are at a social networking event. Your body feels _____.", words: ["relaxed", "tense"], labels: ["benign", "anxiety"] },
      { stimulus: "You attend a party without knowing anyone but the birthday boy. You feel _____.", words: ["ready", "anxious"], labels: ["benign", "anxiety"] },
      { stimulus: "You have just changed jobs. Your new colleagues _____ you.", words: ["like", "dislike"], labels: ["benign", "anxiety"] },
      { stimulus: "The flight attendant announces a flight delay. There is a/an _____.", words: ["bomb threat", "aircraft maintenance"], labels: ["benign", "anxiety"] },
      { stimulus: "You forgot about an important deadline. You feel _____.", words: ["doomed", "hopeful"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend seems hesitant in sharing information with you. Your friend is _____.", words: ["planning a surprise", "distancing himself"], labels: ["benign", "anxiety"] },
      { stimulus: "Your supervisor asks to chat privately. You are up for a _____.", words: ["promotion", "scolding"], labels: ["benign", "anxiety"] },
      { stimulus: "You find a handwritten note on your doorstep. Your neighbour is _____ you.", words: ["thanking", "reporting"], labels: ["benign", "anxiety"] },
      { stimulus: "You don't know how to answer a question in class. You feel _____.", words: ["curious", "incompetent"], labels: ["benign", "anxiety"] },
      { stimulus: "A colleague mentions they heard a rumor about upcoming layoffs. You are certain that you will _____.", words: ["be laid off", "stay"], labels: ["benign", "anxiety"] },
      { stimulus: "You give a speech at your friend’s wedding. When you have finished, you observe the audience’s reaction. They are _____.", words: ["smiling", "frowning"], labels: ["benign", "anxiety"] },
      { stimulus: "You see yourself in the mirror in the morning. You look _____.", words: ["sleepy", "horrible"], labels: ["benign", "dysphoric"] },
      { stimulus: "You are lying on the beach. You feel _____.", words: ["relaxed", "stressed"], labels: ["benign", "dysphoric"] },
      { stimulus: "Your parents hire a lawyer. They are getting a _____.", words: ["new business", "divorce"], labels: ["benign", "dysphoric"] },
      { stimulus: "Somebody is asking you for directions. You _____.", words: ["help", "avoid"], labels: ["benign", "dysphoric"] },
      { stimulus: "There is a moment of silence during a conversation. You find this _____.", words: ["natural", "embarrassing"], labels: ["benign", "dysphoric"] },
      { stimulus: "Your new job has changed your life for the _____.", words: ["better", "worse"], labels: ["benign", "dysphoric"] },
      { stimulus: "Your partner is not home yet. He/she is _____.", words: ["delayed", "cheating"], labels: ["benign", "dysphoric"] },
      { stimulus: "You are thinking about your future, feeling _____.", words: ["enthusiastic", "worried"], labels: ["benign", "dysphoric"] },
      { stimulus: "You get a new job. You are _____.", words: ["qualified", "unqualified"], labels: ["benign", "dysphoric"] },
      { stimulus: "People always tell you to smile. You are _____.", words: ["loved", "defective"], labels: ["benign", "dysphoric"] },
      { stimulus: "Your grades are starting to drop because you are a _____.", words: ["caretaker", "failure"], labels: ["benign", "dysphoric"] },
      { stimulus: "A neighbour approaches you, frowning. He is _____.", words: ["concerned", "angry"], labels: ["benign", "dysphoric"] },
      { stimulus: "You bought your friend a birthday gift. When she opens it, she looks _____.", words: ["excited", "disappointed"], labels: ["benign", "dysphoric"] },
      { stimulus: "You wake up and get out of bed. You feel _____.", words: ["energetic", "lethargic"], labels: ["benign", "dysphoric"] },
      { stimulus: "You go to a place you visited as a child. Walking around makes you feel _____.", words: ["reminiscent ", "tense"], labels: ["benign", "dysphoric"] },
      { stimulus: "You give a speech at your friend’s wedding. When you have finished, you observe the audience’s reaction. They are _____.", words: ["smiling", "frowning"], labels: ["benign", "dysphoric"] },
      { stimulus: "You have recently taken an important exam. Your results arrive with an unexpected letter of explanation about your grade. You did exceptionally _____.", words: ["well", "poorly"], labels: ["benign", "dysphoric"] },
      { stimulus: "You are sitting on the beach. You look up to notice the weather really beginning to change. There is a _____.", words: ["sunset", "thunderstorm"], labels: ["benign", "dysphoric"] },
      { stimulus: "It’s New Year ’s Eve. You think about the year ahead of you, full of _____.", words: ["hope", "dread"], labels: ["benign", "dysphoric"] },
      { stimulus: "You organise a year-end party for your old-time friends, but no one shows up at the door. The party is _____.", words: ["delayed", "boring"], labels: ["benign", "dysphoric"] },
      { stimulus: "You just finished a major project. You feel _____.", words: ["relieved", "tired"], labels: ["benign", "dysphoric"] },
      { stimulus: "You used to regularly attend a weekly pub quiz with your friends but no longer want to. This is because you are _____.", words: ["busy", "not interested"], labels: ["benign", "dysphoric"] },
      { stimulus: "Your friend asked you to help them run an errand and you agreed. However, you forgot about it throughout the week. You feel _____.", words: ["regretful", "useless"], labels: ["benign", "dysphoric"] },
      { stimulus: "You are cooking and accidentally burned a dish. You decide to _____.", words: ["try again", "stop"], labels: ["benign", "dysphoric"] },
      { stimulus: "You are up for an important evaluation. You predict that you will _____.", words: ["pass", "fail"], labels: ["benign", "dysphoric"] },
      { stimulus: "You are on holiday. When you arrived at the hotel, you feel a sense of _____.", words: ["excitement", "calm"], labels: ["benign", "positive"] },
      { stimulus: "Micah was waiting for his date at the cafe and wants to make a good impression. He sprays _____.", words: ["breath spray", "cologne"], labels: ["benign", "positive"] },
      { stimulus: "Christmas is around the corner and you have to attend a family _____.", words: ["picnic", "gathering"], labels: ["benign", "positive"] },
      { stimulus: "After showering, you feel _____.", words: ["refreshed", "wet"], labels: ["benign", "positive"] },
      { stimulus: "You are exercising at a nearby park. You heard a loud panting noise behind you. It is a _____.", words: ["dog", "runner"], labels: ["benign", "positive"] },
      { stimulus: "On the way home, it starts to rain. You reach for your _____.", words: ["umbrella", "poncho"], labels: ["benign", "positive"] },
      { stimulus: "You play music in the car but no sound comes out. Your phone is _____.", words: ["dead", "not plugged in"], labels: ["benign", "positive"] },
      { stimulus: "You finally meet your friends after a long time. You catch up over _____.", words: ["lunch", "dinner"], labels: ["benign", "positive"] },
      { stimulus: "Andrea is on a nature walk. Her mood is _____.", words: ["tranquil", "elevated"], labels: ["benign", "positive"] },
      { stimulus: "Reuben is at the start line of a race. He aims for the _____.", words: ["finish line", "last hurdle"], labels: ["benign", "positive"] },
      { stimulus: "You are entering a rollercoaster ride. You feel a sense of _____.", words: ["adrenaline", "excitement"], labels: ["benign", "positive"] },
      { stimulus: "You are posted to a separate office for work, and your colleague decides to follow you there. You think your colleague is _____.", words: ["loyal", "helpful"], labels: ["benign", "positive"] },
      { stimulus: "You receive a call from an unknown number. It turns out that it is your _____.", words: ["long-lost friend", "delivery order"], labels: ["benign", "positive"] },
      { stimulus: "Timothy find a lost wallet in a restaurant. He calls the _____.", words: ["waiter", "police"], labels: ["benign", "positive"] },
      { stimulus: "There is a sudden power outage in your house. It is caused by the _____.", words: ["storm", "maintenance work"], labels: ["benign", "positive"] },
      { stimulus: "Adam is running for the bus. The bus driver sees him and _____.", words: ["nods", "waits"], labels: ["benign", "positive"] },
      { stimulus: "Ashley noticed that her garden is overgrown, and is attracting many _____.", words: ["butterflies", "bees"], labels: ["benign", "positive"] },
      { stimulus: "A new coffee shop opened in your neighborhood. You visit the shop to _____.", words: ["get coffee", "relax"], labels: ["benign", "positive"] },
      { stimulus: "You noticed a dent in you car. You think that it must have been caused by a/an _____.", words: ["animal", "tree branch"], labels: ["benign", "positive"] },
      { stimulus: "The doorbell rings but you are not expecting anyone. You opened the door and it is a _____.", words: ["girl scout", "real estate agent"], labels: ["benign", "positive"] },
      { stimulus: "Samuel bumped into a _____ at the petrol station.", words: ["friend", "relative"], labels: ["benign", "positive"] },
      { stimulus: "Teachers commented that you were an _____ student growing up.", words: ["inquisitive", "responsible"], labels: ["benign", "positive"] },
      { stimulus: "Hannah recently won a lucky draw and decides to donate the money to charity. Her peers say that she is _____.", words: ["passionate", "philanthropic"], labels: ["benign", "positive"] },
      { stimulus: "Paul was praised for being _____ when he created multiple excel sheets for a project.", words: ["bold", "meticulous"], labels: ["benign", "positive"] },
      { stimulus: "Jordan is always ready to comfort a friend in distress. Jordan is _____.", words: ["popular ", "sensitive"], labels: ["benign", "positive"] },
    ];
    shuffleArray(stimuli);

    /* EXPERIMENT TIMELINE */

    // Initialize experiment timeline
    var WSAP_timeline = [];

    // Briefing / Instructions Page
    var welcome = {
      type: "html-keyboard-response",
      stimulus: `
            <div style="font-size:20px;">
            <p style="font-weight:bold;">You will now proceed to the Word Sentence Association Paradigm (WSAP) Task.</p><br><br>
            <p style="font-weight:bold;text-decoration:underline;">Instructions</p><br>
            <p>In this task, a fixation cross ('+') will appear for 0.5 seconds, indicating the start of a trial.</p><br>
            <p>After 0.5 seconds is up, you will be presented with a sentence. Each sentence will be in a fill-in-the-blank format, like such:</p><br>
            <p style="font-style:italic;">I am feeling tired. I must be _____.</p><br>
            <p>Please press the <strong>spacebar</strong> after you have finished reading the sentence. Thereafter, you will be presented with two words below the sentence. Your job is to complete the sentence with the word of your choice, <strong><u>as soon as possible</u></strong>.</p><br>
            <p>Use the "F" or the "J" keys on your keyboard to indicate the words. Use the <strong>"F" key</strong> to indicate the word on the <strong>left</strong>; use the <strong>"J" key</strong> to indicate the word on the <strong>right</strong>. The word options will only appear for 1.5 seconds before the next trial begins.</p><br>
            <p>There will be 6 practice trials before the main task begins. Please press either the "F" key or the "J" key to proceed.</p><br>
            </div>
        `,
      choices: ['f', 'j'],
    };

    // Briefing Page
    var briefing = {
      type: "html-keyboard-response",
      stimulus: `
            <div style="font-size:20px;">
            <p style="font-weight:bold;">You have completed the practice trials, and will now proceed to the actual Word Sentence Association Paradigm (WSAP) Task.</p><br><br>
            <p style="font-weight:bold;text-decoration:underline;">Instructions</p><br>
            <p>In this task, a fixation cross ('+') will appear for 0.5 seconds, indicating the start of a trial.</p><br>
            <p>After 0.5 seconds is up, you will be presented with a sentence. Each sentence will be in a fill-in-the-blank format, like such:</p><br>
            <p style="font-style:italic;">I am feeling tired. I must be _____.</p><br>
            <p>Please press the <strong>spacebar</strong> after you have finished reading the sentence. Thereafter, you will be presented with two words below the sentence. Your job is to complete the sentence with the word of your choice, <strong><u>as soon as possible</u></strong>.</p><br>
            <p>Use the "F" or the "J" keys on your keyboard to indicate the words. Use the <strong>"F" key</strong> to indicate the word on the <strong>left</strong>; use the <strong>"J" key</strong> to indicate the word on the <strong>right</strong>. The word options will only appear for 1.5 seconds before the next trial begins.</p><br>
            <p>Please complete <strong>all 100 trials</strong>. This task is estimated to take <strong>12 minutes</strong>. Please press either the "F" key or the "J" key to proceed.</p><br>
            </div>
        `,
      choices: ['f', 'j'],
    };

    // Debriefing Page
    var debriefing = {
      type: "html-keyboard-response",
      stimulus: `
                <div style="font-size:20px;">
                <p>You have completed the Word Sentence Association Paradigm (WSAP) Task.</p><br>
                <p>Press the spacebar key to return to the rest of the Survey.</p>
                </div>
            `,
      choices: [" "],
    };

    // Fixation cross to be used for the experiment
    var fixation_cross = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:140px;font-weight:bold;">+</div>',
      choices: [],
      trial_duration: 500,
      post_trial_gap: 500,
      data: {
        task: 'fixation',
      },
    };

    // Stimulus page
    var scenario_page = {
      type: 'html-keyboard-response',
      stimulus: () =>
        '<div style="font-size:20px;font-weight:bold;">' +
        "<p>" + jsPsych.timelineVariable('stimulus') + "</p>" +
        "<br><br>" +
        "<p>&nbsp;</p>" +
        "</div >",
      choices: [" "],
      data: {
        task: 'stimulus',
      },
    }

    // Stimulus page with words (Practice Trial Version)
    var scenario_page_words_practice = {
      type: 'html-keyboard-response',
      stimulus: () => {
        // Randomize the order of the two words
        var idx_left = Math.round(Math.random());
        var idx_right = 1 - idx_left;
        return '<div style="font-size:20px;font-weight:bold;">' +
          "<p>" + jsPsych.timelineVariable('stimulus') + "</p>" +
          "<br><br>" +
          "<p>" + jsPsych.timelineVariable('words')[idx_left] +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
          jsPsych.timelineVariable('words')[idx_right] + "</p>" +
          "</div >"
      },
      choices: ['f', 'j'],
      trial_duration: 3000,
      post_trial_gap: 500,
      data: {
        task: 'practice_response',
      },
    }

    // Stimulus page with words
    var scenario_idx = -1;
    var scenario_page_words = {
      type: 'html-keyboard-response',
      stimulus: () => {
        // Randomize the order of the two words
        var idx_left = Math.round(Math.random());
        var idx_right = 1 - idx_left;
        scenario_idx = idx_left;
        return '<div style="font-size:20px;font-weight:bold;">' +
          "<p>" + jsPsych.timelineVariable('stimulus') + "</p>" +
          "<br><br>" +
          "<p>" + jsPsych.timelineVariable('words')[idx_left] +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
          jsPsych.timelineVariable('words')[idx_right] + "</p>" +
          "</div >"
      },
      choices: ['f', 'j'],
      trial_duration: 3000,
      post_trial_gap: 500,
      data: {
        task: 'response',
        idx: () => scenario_idx,
        labels: jsPsych.timelineVariable('labels'),
      },
      on_finish: (data) => {
        // data.idx represents which word was displayed on the left. 
        // 0 = Left was labels[0], 1 = Left was labels[1]. If -1, there may have been an error running any of the trials.
        data.valence = data.response === 'f' ? data.labels[data.idx] : data.response === 'j' ? data.labels[1 - data.idx] : "";
      },
    }

    var practice_procedure = {
      timeline: [fixation_cross, scenario_page, scenario_page_words_practice],
      timeline_variables: practice_stimuli
    };

    var experiment_procedure = {
      timeline: [fixation_cross, scenario_page, scenario_page_words],
      timeline_variables: stimuli
    };

    WSAP_timeline.push(welcome);
    WSAP_timeline.push(practice_procedure);
    WSAP_timeline.push(briefing);
    WSAP_timeline.push(experiment_procedure);
    WSAP_timeline.push(debriefing);

    jsPsych.init({
      /* CHANGE HERE: Your JsPsych Timeline */
      timeline: WSAP_timeline,
      display_element: 'display_stage',

      // Adding the clean up and continue functions
      on_finish: function (data) {

        var trials = jsPsych.data.get().filter({ task: 'response' });
        var data_stimulus = trials.select('stimulus')['values'].toString();
        var data_response = trials.select('response')['values'].toString();
        var data_rt = trials.select('rt')['values'].toString();
        var data_valence = trials.select('valence')['values'].toString();

        Qualtrics.SurveyEngine.setJSEmbeddedData("stimulus", data_stimulus);
        Qualtrics.SurveyEngine.setJSEmbeddedData("response", data_response);
        Qualtrics.SurveyEngine.setJSEmbeddedData("reaction_time", data_rt);
        Qualtrics.SurveyEngine.setJSEmbeddedData("valence", data_valence);

        jQuery('#display_stage').remove();
        jQuery('#display_stage_background').remove();

        // Simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
      }
    });
  }
});

Qualtrics.SurveyEngine.addOnReady(function () {
  /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
  /*Place your JavaScript here to run when the page is unloaded*/

});