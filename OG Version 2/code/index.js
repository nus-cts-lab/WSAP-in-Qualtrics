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

    // Base scenarios for creating word-sentence pairs
    var base_practice_scenarios = [
      { stimulus: "He noticed that the room door was left open.", words: ["Delay", "Lost"], labels: ["practice0", "practice1"] },
      { stimulus: "She was looking at her phone quietly.", words: ["Waiting", "Reading"], labels: ["practice0", "practice1"] },
    ];

    var base_scenarios = [
      // ANXIETY items
      { stimulus: "The flight attendant announces a flight delay.", words: ["Aircraft maintenance", "Distancing himself"], labels: ["benign", "anxiety"] },
      { stimulus: "People laugh after something you said.", words: ["Funny", "Embarrassing"], labels: ["benign", "anxiety"] },
      { stimulus: "You have a big presentation tomorrow, and you cannot sleep.", words: ["Excited", "Unprepared"], labels: ["benign", "anxiety"] },
      { stimulus: "You finish last among everyone on a test.", words: ["Cautious", "Stupid"], labels: ["benign", "anxiety"] },
      { stimulus: "Your supervisor asks to chat privately.", words: ["Promotion", "Scolding"], labels: ["benign", "anxiety"] },
      { stimulus: "A colleague mentions they heard a rumour about upcoming layoffs. You are certain of your outcome.", words: ["Stay", "Laid off"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend is not replying to your messages. Something must be up.", words: ["Occupied", "Upset"], labels: ["benign", "anxiety"] },
      { stimulus: "Your date is not here yet.", words: ["Traffic", "No-show"], labels: ["benign", "anxiety"] },
      { stimulus: "You are at a social networking event and notice how your body feels.", words: ["Relaxed", "Tense"], labels: ["benign", "anxiety"] },
      
      // DEPRESSION items
      { stimulus: "You wake up and get out of bed.", words: ["Energetic", "Lethargic"], labels: ["benign", "depression"] },
      { stimulus: "You just finished a major project.", words: ["Relieved", "Tired"], labels: ["benign", "depression"] },
      { stimulus: "Your parents hire a lawyer.", words: ["New business", "Divorce"], labels: ["benign", "depression"] },
      { stimulus: "You organise a year-end party for your old-time friends, but no one shows up.", words: ["Delayed", "Boring"], labels: ["benign", "depression"] },
      { stimulus: "You get a new job.", words: ["Qualified", "Unqualified"], labels: ["benign", "depression"] },
      { stimulus: "It's New Year's Eve and you think about the year ahead of you.", words: ["Hope", "Dread"], labels: ["benign", "depression"] },
      { stimulus: "You go to a place you visited as a child and walk around.", words: ["Reminiscent", "Tense"], labels: ["benign", "depression"] },
      { stimulus: "You bought your friend a birthday gift. She opens it and makes an expression.", words: ["Excited", "Disappointed"], labels: ["benign", "depression"] },
      { stimulus: "You are lying on the beach.", words: ["Relaxed", "Stressed"], labels: ["benign", "depression"] },
      
      // POSITIVE items
      { stimulus: "You visit to a new coffee shop that opened in your neighbourhood.", words: ["Get coffee", "Relax"], labels: ["benign", "positive"] },
      { stimulus: "Paul was praised for when he created multiple Excel sheets for a project.", words: ["Bold", "Meticulous"], labels: ["benign", "positive"] },
      { stimulus: "You finally meet your friends after a long time. You catch up over food.", words: ["Lunch", "Dinner"], labels: ["benign", "positive"] },
      { stimulus: "You are exercising at a nearby park and hear a loud panting noise behind you.", words: ["Dog", "Runner"], labels: ["benign", "positive"] },
      { stimulus: "You are posted to a separate office for work, and your colleague decides to follow you there.", words: ["Loyal", "Helpful"], labels: ["benign", "positive"] },
      { stimulus: "There is a sudden power outage in your house.", words: ["Storm", "Maintenance work"], labels: ["benign", "positive"] },
      { stimulus: "Andrea is on a nature walk and notices her mood.", words: ["Tranquil", "Elevated"], labels: ["benign", "positive"] },
      { stimulus: "You receive a call from an unknown number.", words: ["Long-lost friend", "Delivery order"], labels: ["benign", "positive"] },
      { stimulus: "You are entering a rollercoaster ride.", words: ["Adrenaline", "Excitement"], labels: ["benign", "positive"] }
    ];

    // Function to create word-sentence pairs for WSAP
    function createWordSentencePairs(scenarios) {
      var pairs = [];
      scenarios.forEach(function(scenario) {
        // Create pair for benign word
        pairs.push({
          word: scenario.words[0],
          sentence: scenario.stimulus,
          word_type: scenario.labels[0],
          scenario_type: scenario.labels[1]
        });
        // Create pair for threat/negative word
        pairs.push({
          word: scenario.words[1],
          sentence: scenario.stimulus,
          word_type: scenario.labels[0] === "benign" ? "threat" : scenario.labels[1],
          scenario_type: scenario.labels[1]
        });
      });
      return pairs;
    }

    // Create WSAP stimuli (word-sentence pairs)
    var practice_stimuli = createWordSentencePairs(base_practice_scenarios);
    var stimuli = createWordSentencePairs(base_scenarios);
    
    shuffleArray(practice_stimuli);
    shuffleArray(stimuli);

    /* EXPERIMENT TIMELINE */

    // Initialize experiment timeline
    var WSAP_timeline = [];

    // Briefing / Instructions Page
    var welcome = {
      type: "html-keyboard-response",
      stimulus: `
            <div style="font-size:20px;">
            <p style="font-weight:bold;">You will now proceed to the Word Sentence Association Paradigm (WSAP) Original Task.</p><br><br>
            <p style="font-weight:bold;text-decoration:underline;">Instructions</p><br>
            <p>In this task, each trial consists of three steps:</p><br>
            <p><strong>1.</strong> A fixation cross ('+') will appear for 0.5 seconds to start each trial.</p><br>
            <p><strong>2.</strong> An ambiguous sentence will appear. Press the <strong>spacebar</strong> when you have finished reading it.</p><br>
            <p><strong>3.</strong> You will be asked whether a word and the sentence are <strong>RELATED</strong> or <strong>UNRELATED</strong>.</p><br>
            <p>Press the <strong>"R" key</strong> if you think the word and sentence are <strong>RELATED</strong>.</p>
            <p>Press the <strong>"U" key</strong> if you think the word and sentence are <strong>UNRELATED</strong>.</p><br>
            <p>Please respond as quickly and accurately as possible. Your reaction times will be recorded. The trial will move on after 5 seconds if a choice is not selected.</p><br>
            <p>There will be 4 practice trials before the main task begins. Please press either the "R" key or the "U" key to proceed.</p><br>
            </div>
        `,
      choices: ['r', 'u'],
    };

    // Briefing Page
    var briefing = {
      type: "html-keyboard-response",
      stimulus: `
            <div style="font-size:20px;">
            <p style="font-weight:bold;">You have completed the practice trials, and will now proceed to the actual Word Sentence Association Paradigm (WSAP) Task.</p><br><br>
            <p style="font-weight:bold;text-decoration:underline;">Reminder of Instructions</p><br>
            <p>In each trial:</p><br>
            <p><strong>1.</strong> A fixation cross ('+') appears for 0.5 seconds</p><br>
            <p><strong>2.</strong> An ambiguous sentence appears - press <strong>spacebar</strong> when finished reading</p><br>
            <p><strong>3.</strong> Judge if a word and the sentence are <strong>RELATED</strong> or <strong>UNRELATED</strong></p><br>
            <p>Press <strong>"R"</strong> for RELATED &nbsp;&nbsp;&nbsp;&nbsp; Press <strong>"U"</strong> for UNRELATED</p><br>
            <p>Please complete <strong>all 54 trials</strong>. This task is estimated to take <strong>6-8 minutes</strong>. Please respond as quickly and accurately as possible. Your reaction times will be recorded.</p><br>
            <p>Press either the "R" key or the "U" key to begin the main task.</p><br>
            </div>
        `,
      choices: ['r', 'u'],
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
      stimulus: '<div style="font-size:140px;font-weight:bold;text-align:center;">+</div>',
      choices: [],
      trial_duration: 500,
      post_trial_gap: 0,
      data: {
        task: 'fixation',
      },
    };


    // Sentence presentation page (ambiguous sentences without blanks)
    var sentence_page = {
      type: 'html-keyboard-response',
      stimulus: () =>
        '<div style="font-size:20px;text-align:center;">' +
        "<p>" + jsPsych.timelineVariable('sentence') + "</p>" +
        "<br><br>" +
        "<p>Press spacebar when you have finished reading.</p>" +
        "</div>",
      choices: [" "],
      data: {
        task: 'sentence_reading',
        sentence: jsPsych.timelineVariable('sentence')
      },
    }

    // Relatedness judgment task (Practice Version)
    var relatedness_judgment_practice = {
      type: 'html-keyboard-response',
      stimulus: () => {
        return '<div style="font-size:20px;text-align:center;">' +
          "<p>" + jsPsych.timelineVariable('sentence') + "</p>" +
          "<br><br>" +
          "<p><strong>" + jsPsych.timelineVariable('word') + "</strong></p>" +
          "<br><br>" +
          "<p>Press <strong>R</strong> for RELATED &nbsp;&nbsp;&nbsp;&nbsp; Press <strong>U</strong> for UNRELATED</p>" +
          "</div>"
      },
      choices: ['r', 'u'],
      trial_duration: 5000,
      post_trial_gap: 500,
      data: {
        task: 'practice_relatedness_judgment',
        word: jsPsych.timelineVariable('word'),
        sentence: jsPsych.timelineVariable('sentence'),
        word_type: jsPsych.timelineVariable('word_type')
      },
      on_finish: (data) => {
        data.response_type = data.response === 'r' ? 'related' : data.response === 'u' ? 'unrelated' : 'timeout';
        data.endorsement = (data.response === 'r') ? 1 : 0;
      },
    }

    // Relatedness judgment task (Main Experiment)
    var relatedness_judgment = {
      type: 'html-keyboard-response',
      stimulus: () => {
        return '<div style="font-size:20px;text-align:center;">' +
          "<p>" + jsPsych.timelineVariable('sentence') + "</p>" +
          "<br><br>" +
          "<p><strong>" + jsPsych.timelineVariable('word') + "</strong></p>" +
          "<br><br>" +
          "<p>Press <strong>R</strong> for RELATED &nbsp;&nbsp;&nbsp;&nbsp; Press <strong>U</strong> for UNRELATED</p>" +
          "</div>"
      },
      choices: ['r', 'u'],
      trial_duration: 5000,
      post_trial_gap: 500,
      data: {
        task: 'relatedness_judgment',
        word: jsPsych.timelineVariable('word'),
        sentence: jsPsych.timelineVariable('sentence'),
        word_type: jsPsych.timelineVariable('word_type'),
        scenario_type: jsPsych.timelineVariable('scenario_type')
      },
      on_finish: (data) => {
        data.response_type = data.response === 'r' ? 'related' : data.response === 'u' ? 'unrelated' : 'timeout';
        data.endorsement = (data.response === 'r') ? 1 : 0;
      },
    }

    var practice_procedure = {
      timeline: [fixation_cross, sentence_page, relatedness_judgment_practice],
      timeline_variables: practice_stimuli
    };

    var experiment_procedure = {
      timeline: [fixation_cross, sentence_page, relatedness_judgment],
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

        var trials = jsPsych.data.get().filter({ task: 'relatedness_judgment' });
        
        // Collect only raw data - no calculations or transformations
        var data_sentences = trials.select('sentence')['values'].toString();
        var data_words = trials.select('word')['values'].toString();
        var data_word_types = trials.select('word_type')['values'].toString();
        var data_responses = trials.select('response')['values'].toString();
        var data_rt = trials.select('rt')['values'].toString();
        var data_scenario_types = trials.select('scenario_type')['values'].toString();

        // Set embedded data for Qualtrics - only raw fields
        Qualtrics.SurveyEngine.setJSEmbeddedData("sentences", data_sentences);
        Qualtrics.SurveyEngine.setJSEmbeddedData("words", data_words);
        Qualtrics.SurveyEngine.setJSEmbeddedData("word_types", data_word_types);
        Qualtrics.SurveyEngine.setJSEmbeddedData("responses", data_responses);
        Qualtrics.SurveyEngine.setJSEmbeddedData("reaction_times", data_rt);
        Qualtrics.SurveyEngine.setJSEmbeddedData("scenario_types", data_scenario_types);

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