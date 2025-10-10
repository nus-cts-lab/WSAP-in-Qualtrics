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
    ];
    shuffleArray(practice_stimuli);

    // Scenarios for the experiment
    var stimuli = [
      // ANXIETY items
      { stimulus: "You hear a noise in the night. It is from a _____.", words: ["dog", "robbery"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend comments on your behaviour. She _____ of how you acted.", words: ["approves", "disapproves"], labels: ["benign", "anxiety"] },
      { stimulus: "You give a speech at your friend's wedding. When you have finished, you observe the audience's reaction. They are _____.", words: ["smiling", "frowning"], labels: ["benign", "anxiety"] },
      { stimulus: "Your boss wants to meet you to _____ you.", words: ["praise", "criticise"], labels: ["benign", "anxiety"] },
      { stimulus: "There is a change in your salary. You are getting a _____.", words: ["raise", "pay cut"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend seems hesitant in sharing information with you. Your friend is _____.", words: ["planning a surprise", "distancing himself"], labels: ["benign", "anxiety"] },
      { stimulus: "Your date has to leave early. Your date is _____.", words: ["busy", "bored"], labels: ["benign", "anxiety"] },
      { stimulus: "You don't know how to answer a question in class. You feel _____.", words: ["curious", "incompetent"], labels: ["benign", "anxiety"] },
      { stimulus: "A friend does not respond when you wave hello because she is _____.", words: ["distracted", "mad"], labels: ["benign", "anxiety"] },
      
      // DEPRESSION items
      { stimulus: "You see yourself in the mirror in the morning. You look _____.", words: ["sleepy", "horrible"], labels: ["benign", "depression"] },
      { stimulus: "Your new job has changed your life for the _____.", words: ["better", "worse"], labels: ["benign", "depression"] },
      { stimulus: "Your partner is not home yet. He/she is _____.", words: ["delayed", "cheating"], labels: ["benign", "depression"] },
      { stimulus: "People always tell you to smile. You are _____.", words: ["loved", "defective"], labels: ["benign", "depression"] },
      { stimulus: "You are up for an important evaluation. You predict that you will _____.", words: ["pass", "fail"], labels: ["benign", "depression"] },
      { stimulus: "You are thinking about your future, feeling _____.", words: ["enthusiastic", "worried"], labels: ["benign", "depression"] },
      { stimulus: "You are cooking and accidentally burned a dish. You decide to _____.", words: ["try again", "stop"], labels: ["benign", "depression"] },
      { stimulus: "You used to regularly attend a weekly pub quiz with your friends but no longer want to. This is because you are _____.", words: ["busy", "not interested"], labels: ["benign", "depression"] },
      { stimulus: "There is a moment of silence during a conversation. You find this _____.", words: ["natural", "embarrassing"], labels: ["benign", "depression"] },
      
      // POSITIVE items
      { stimulus: "You are on holiday. When you arrived at the hotel, you feel a sense of _____.", words: ["excitement", "calm"], labels: ["benign", "positive"] },
      { stimulus: "Micah was waiting for his date at the cafe and wants to make a good impression. He sprays _____.", words: ["breath spray", "cologne"], labels: ["benign", "positive"] },
      { stimulus: "Christmas is around the corner and you have to attend a family _____.", words: ["picnic", "gathering"], labels: ["benign", "positive"] },
      { stimulus: "On the way home, it starts to rain. You reach for your _____.", words: ["umbrella", "poncho"], labels: ["benign", "positive"] },
      { stimulus: "You play music in the car but no sound comes out. Your phone is _____.", words: ["dead", "not plugged in"], labels: ["benign", "positive"] },
      { stimulus: "Ashley noticed that her garden is overgrown, and is attracting many _____.", words: ["butterflies", "bees"], labels: ["benign", "positive"] },
      { stimulus: "The doorbell rings but you are not expecting anyone. You opened the door and it is a _____.", words: ["girl scout", "real estate agent"], labels: ["benign", "positive"] },
      { stimulus: "Samuel bumped into a _____ at the petrol station.", words: ["friend", "relative"], labels: ["benign", "positive"] },
      { stimulus: "Teachers commented that you were an _____ student growing up.", words: ["inquisitive", "responsible"], labels: ["benign", "positive"] },
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
            <p>Please complete <strong>all 27 trials</strong>. This task is estimated to take <strong>4 minutes</strong>. Please press either the "F" key or the "J" key to proceed.</p><br>
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