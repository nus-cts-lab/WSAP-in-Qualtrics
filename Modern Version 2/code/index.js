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
      { stimulus: "You are feeling tired from three days of camping. When you get home, you _____.", words: ["sleep", "shower"], labels: ["practice0", "practice1"] },
      { stimulus: "Yesterday, you hung a picture up on the _____.", words: ["wall", "tree"], labels: ["practice0", "practice1"] },
    ];
    shuffleArray(practice_stimuli);

    // Scenarios for the experiment
    var stimuli = [
      // ANXIETY items
      { stimulus: "The flight attendant announces a flight delay. There is a/an _____.", words: ["Aircraft maintenance", "Distancing himself"], labels: ["benign", "anxiety"] },
      { stimulus: "People laugh after something you said. You said something _____.", words: ["Funny", "Embarrassing"], labels: ["benign", "anxiety"] },
      { stimulus: "You have a big presentation tomorrow. You cannot sleep because you are _____.", words: ["Excited", "Unprepared"], labels: ["benign", "anxiety"] },
      { stimulus: "You finish last of everyone on a test. You are _____.", words: ["Cautious", "Stupid"], labels: ["benign", "anxiety"] },
      { stimulus: "Your supervisor asks to chat privately. You are up for a _____.", words: ["Promotion", "Scolding"], labels: ["benign", "anxiety"] },
      { stimulus: "A colleague mentions they heard a rumor about upcoming layoffs. You are certain that you will _____.", words: ["Stay", "Laid off"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend is not replying to your messages. Your friend is _____.", words: ["Occupied", "Upset"], labels: ["benign", "anxiety"] },
      { stimulus: "Your date is not here yet because of _____.", words: ["Traffic", "No-show"], labels: ["benign", "anxiety"] },
      { stimulus: "You are at a social networking event. Your body feels _____.", words: ["Relaxed", "Tense"], labels: ["benign", "anxiety"] },
      
      // DEPRESSION items
      { stimulus: "You wake up and get out of bed. You feel _____.", words: ["Energetic", "Lethargic"], labels: ["benign", "depression"] },
      { stimulus: "You just finished a major project. You feel _____.", words: ["Relieved", "Tired"], labels: ["benign", "depression"] },
      { stimulus: "Your parents hire a lawyer. They are getting a _____.", words: ["New business", "Divorce"], labels: ["benign", "depression"] },
      { stimulus: "You organize a year-end party for your old-time friends, but no one shows up at the door. The party is _____.", words: ["Delayed", "Boring"], labels: ["benign", "depression"] },
      { stimulus: "You get a new job. You are _____.", words: ["Qualified", "Unqualified"], labels: ["benign", "depression"] },
      { stimulus: "It's New Year 's Eve. You think about the year ahead of you, full of _____.", words: ["Hope", "Dread"], labels: ["benign", "depression"] },
      { stimulus: "You go to a place you visited as a child. Walking around makes you feel _____.", words: ["Reminiscent", "Tense"], labels: ["benign", "depression"] },
      { stimulus: "You bought your friend a birthday gift. When she opens it, she looks _____.", words: ["Excited", "Disappointed"], labels: ["benign", "depression"] },
      { stimulus: "You are lying on the beach. You feel _____.", words: ["Relaxed", "Stressed"], labels: ["benign", "depression"] },
      
      // POSITIVE items
      { stimulus: "A new coffee shop opened in your neighborhood. You visit the shop to _____.", words: ["Get coffee", "Relax"], labels: ["benign", "positive"] },
      { stimulus: "Paul was praised for being _____ when he created multiple excel sheets for a project.", words: ["Bold", "Meticulous"], labels: ["benign", "positive"] },
      { stimulus: "You finally meet your friends after a long time. You catch up over _____.", words: ["Lunch", "Dinner"], labels: ["benign", "positive"] },
      { stimulus: "You are exercising at a nearby park. You heard a loud panting noise behind you. It is a _____.", words: ["Dog", "Runner"], labels: ["benign", "positive"] },
      { stimulus: "You are posted to a separate office for work, and your colleague decides to follow you there. You think your colleague is _____.", words: ["Loyal", "Helpful"], labels: ["benign", "positive"] },
      { stimulus: "There is a sudden power outage in your house. It is caused by the _____.", words: ["Storm", "Maintenance work"], labels: ["benign", "positive"] },
      { stimulus: "Andrea is on a nature walk. Her mood is _____.", words: ["Tranquil", "Elevated"], labels: ["benign", "positive"] },
      { stimulus: "You receive a call from an unknown number. It turns out that it is your _____.", words: ["Long-lost friend", "Delivery order"], labels: ["benign", "positive"] },
      { stimulus: "You are entering a rollercoaster ride. You feel a sense of _____.", words: ["Adrenaline", "Excitement"], labels: ["benign", "positive"] }
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
            <p style="font-weight:bold;">You will now proceed to the Word Sentence Association Paradigm (WSAP) Modern Task.</p><br><br>
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