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
      { stimulus: "The package has not arrived yet.", words: ["Delay", "Lost"], labels: ["practice0", "practice1"] },
      { stimulus: "She was looking at her phone quietly.", words: ["Waiting", "Reading"], labels: ["practice0", "practice1"] },
    ];

    var base_scenarios = [
      // ANXIETY items
      { stimulus: "You hear a noise in the night.", words: ["Dog", "Robbery"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend comments on your behaviour.", words: ["Approves", "Disapproves"], labels: ["benign", "anxiety"] },
      { stimulus: "You give a speech at your friend's wedding. When you have finished, you observe the audience's reaction.", words: ["Smiling", "Frowning"], labels: ["benign", "anxiety"] },
      { stimulus: "Your boss wants to meet you", words: ["Praise", "Criticise"], labels: ["benign", "anxiety"] },
      { stimulus: "There is a change in your salary.", words: ["Raise", "Pay cut"], labels: ["benign", "anxiety"] },
      { stimulus: "Your friend seems hesitant to share information with you.", words: ["Planning a surprise", "Distancing himself"], labels: ["benign", "anxiety"] },
      { stimulus: "Your date has to leave early.", words: ["Busy", "Bored"], labels: ["benign", "anxiety"] },
      { stimulus: "You don't know how to answer a question in class.", words: ["Curious", "Incompetent"], labels: ["benign", "anxiety"] },
      { stimulus: "You wave to say hello but your friend does not respond.", words: ["Distracted", "Mad"], labels: ["benign", "anxiety"] },
      
      // DEPRESSION items
      { stimulus: "You see yourself in the mirror in the morning.", words: ["Sleepy", "Horrible"], labels: ["benign", "depression"] },
      { stimulus: "Your new job has changed your life.", words: ["Better", "Worse"], labels: ["benign", "depression"] },
      { stimulus: "Your partner is not home yet.", words: ["Delayed", "Cheating"], labels: ["benign", "depression"] },
      { stimulus: "People always tell you to smile.", words: ["Loved", "Defective"], labels: ["benign", "depression"] },
      { stimulus: "You are up for an important evaluation.", words: ["Pass", "Fail"], labels: ["benign", "depression"] },
      { stimulus: "You are thinking about your future.", words: ["Enthusiastic", "Worried"], labels: ["benign", "depression"] },
      { stimulus: "You are cooking and accidentally burn a dish.", words: ["Try again", "Stop"], labels: ["benign", "depression"] },
      { stimulus: "You used to regularly attend a weekly pub quiz with your friends, but no longer want to.", words: ["Busy", "Not interested"], labels: ["benign", "depression"] },
      { stimulus: "There is a moment of silence during a conversation.", words: ["Natural", "Embarrassing"], labels: ["benign", "depression"] },
      
      // POSITIVE items
      { stimulus: "You are on holiday and have just arrived at your hotel.", words: ["Excitement", "Calm"], labels: ["benign", "positive"] },
      { stimulus: "Micah was waiting for his date at a cafe and wanted to make a good impression by smelling good.", words: ["Breath spray", "Cologne"], labels: ["benign", "positive"] },
      { stimulus: "Christmas is around the corner, and you are attending a family event.", words: ["Picnic", "Gathering"], labels: ["benign", "positive"] },
      { stimulus: "On the way home, it starts to rain. You reach into your bag.", words: ["Umbrella", "Poncho"], labels: ["benign", "positive"] },
      { stimulus: "You look at your phone to play music in the car but no sound comes out.", words: ["Dead", "Not plugged in"], labels: ["benign", "positive"] },
      { stimulus: "Ashley noticed that her garden is overgrown and is attracting many insects.", words: ["Butterflies", "Bees"], labels: ["benign", "positive"] },
      { stimulus: "The doorbell rings but you are not expecting anyone.", words: ["Girl scout", "Real estate agent"], labels: ["benign", "positive"] },
      { stimulus: "Samuel bumped into someone at the petrol station.", words: ["Friend", "Relative"], labels: ["benign", "positive"] },
      { stimulus: "Teachers have commented on the type of student you were when you were growing up.", words: ["Inquisitive", "Responsible"], labels: ["benign", "positive"] }
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
            <p style="font-weight:bold;">You will now proceed to the Word Sentence Association Paradigm (WSAP) Task.</p><br><br>
            <p style="font-weight:bold;text-decoration:underline;">Instructions</p><br>
            <p>In this task, each trial consists of four steps:</p><br>
            <p><strong>1.</strong> A fixation cross ('+') will appear for 0.5 seconds to start each trial.</p><br>
            <p><strong>2.</strong> A single word will appear for 0.5 seconds. Please read this word carefully.</p><br>
            <p><strong>3.</strong> An ambiguous sentence will appear. Press the <strong>spacebar</strong> when you have finished reading it.</p><br>
            <p><strong>4.</strong> You will be asked whether the word and sentence are <strong>RELATED</strong> or <strong>UNRELATED</strong>.</p><br>
            <p>Press the <strong>"R" key</strong> if you think the word and sentence are <strong>RELATED</strong>.</p>
            <p>Press the <strong>"U" key</strong> if you think the word and sentence are <strong>UNRELATED</strong>.</p><br>
            <p>Please respond as quickly and accurately as possible. Your reaction times will be recorded.</p><br>
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
            <p><strong>2.</strong> A single word appears for 0.5 seconds</p><br>
            <p><strong>3.</strong> An ambiguous sentence appears - press <strong>spacebar</strong> when finished reading</p><br>
            <p><strong>4.</strong> Judge if the word and sentence are <strong>RELATED</strong> or <strong>UNRELATED</strong></p><br>
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

    // Word presentation trial (500ms display)
    var word_presentation = {
      type: 'html-keyboard-response',
      stimulus: () =>
        '<div style="font-size:24px;font-weight:bold;">' +
        jsPsych.timelineVariable('word') +
        '</div>',
      choices: [],
      trial_duration: 500,
      post_trial_gap: 0,
      data: {
        task: 'word_presentation',
        word: jsPsych.timelineVariable('word'),
        word_type: jsPsych.timelineVariable('word_type')
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
      post_trial_gap: 500,
      data: {
        task: 'practice_relatedness_judgment',
        word: jsPsych.timelineVariable('word'),
        sentence: jsPsych.timelineVariable('sentence'),
        word_type: jsPsych.timelineVariable('word_type')
      },
      on_finish: (data) => {
        data.response_type = data.response === 'r' ? 'related' : data.response === 'u' ? 'unrelated' : 'no_response';
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
      post_trial_gap: 500,
      data: {
        task: 'relatedness_judgment',
        word: jsPsych.timelineVariable('word'),
        sentence: jsPsych.timelineVariable('sentence'),
        word_type: jsPsych.timelineVariable('word_type'),
        scenario_type: jsPsych.timelineVariable('scenario_type')
      },
      on_finish: (data) => {
        data.response_type = data.response === 'r' ? 'related' : data.response === 'u' ? 'unrelated' : 'no_response';
        data.endorsement = (data.response === 'r') ? 1 : 0;
        // Calculate WSAP indices
        data.benign_endorsed = (data.word_type === 'benign' && data.endorsement === 1) ? 1 : 0;
        data.threat_endorsed = (data.word_type === 'threat' && data.endorsement === 1) ? 1 : 0;
        data.benign_rejected = (data.word_type === 'benign' && data.endorsement === 0) ? 1 : 0;
        data.threat_rejected = (data.word_type === 'threat' && data.endorsement === 0) ? 1 : 0;
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
        
        // Basic trial data
        var data_words = trials.select('word')['values'].toString();
        var data_sentences = trials.select('sentence')['values'].toString();
        var data_responses = trials.select('response_type')['values'].toString();
        var data_rt = trials.select('rt')['values'].toString();
        var data_word_types = trials.select('word_type')['values'].toString();
        var data_scenario_types = trials.select('scenario_type')['values'].toString();
        
        // WSAP specific indices
        var data_endorsements = trials.select('endorsement')['values'].toString();
        var data_benign_endorsed = trials.select('benign_endorsed')['values'].toString();
        var data_threat_endorsed = trials.select('threat_endorsed')['values'].toString();
        var data_benign_rejected = trials.select('benign_rejected')['values'].toString();
        var data_threat_rejected = trials.select('threat_rejected')['values'].toString();

        // Calculate summary statistics
        var benign_trials = trials.filter({ word_type: 'benign' });
        var threat_trials = trials.filter({ word_type: 'threat' });
        
        var benign_endorsement_rate = benign_trials.select('endorsement').mean();
        var threat_endorsement_rate = threat_trials.select('endorsement').mean();
        
        var benign_endorse_rt = benign_trials.filter({ endorsement: 1 }).select('rt').mean();
        var benign_reject_rt = benign_trials.filter({ endorsement: 0 }).select('rt').mean();
        var threat_endorse_rt = threat_trials.filter({ endorsement: 1 }).select('rt').mean();
        var threat_reject_rt = threat_trials.filter({ endorsement: 0 }).select('rt').mean();

        // Set embedded data for Qualtrics
        Qualtrics.SurveyEngine.setJSEmbeddedData("words", data_words);
        Qualtrics.SurveyEngine.setJSEmbeddedData("sentences", data_sentences);
        Qualtrics.SurveyEngine.setJSEmbeddedData("responses", data_responses);
        Qualtrics.SurveyEngine.setJSEmbeddedData("reaction_times", data_rt);
        Qualtrics.SurveyEngine.setJSEmbeddedData("word_types", data_word_types);
        Qualtrics.SurveyEngine.setJSEmbeddedData("scenario_types", data_scenario_types);
        Qualtrics.SurveyEngine.setJSEmbeddedData("endorsements", data_endorsements);
        
        // WSAP summary indices
        Qualtrics.SurveyEngine.setJSEmbeddedData("benign_endorsement_rate", benign_endorsement_rate);
        Qualtrics.SurveyEngine.setJSEmbeddedData("threat_endorsement_rate", threat_endorsement_rate);
        Qualtrics.SurveyEngine.setJSEmbeddedData("benign_endorse_rt", benign_endorse_rt);
        Qualtrics.SurveyEngine.setJSEmbeddedData("benign_reject_rt", benign_reject_rt);
        Qualtrics.SurveyEngine.setJSEmbeddedData("threat_endorse_rt", threat_endorse_rt);
        Qualtrics.SurveyEngine.setJSEmbeddedData("threat_reject_rt", threat_reject_rt);

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