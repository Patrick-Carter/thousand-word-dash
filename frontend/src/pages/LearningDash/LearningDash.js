import React from "react";

import Grid from "@material-ui/core/Grid";

import DashItem from "./components/DashItem";
import DashSettings from "./components/DashSettings";

const LearningDash = (props) => {
  const pageOptions = [
    {
      tite: "English To Spanish",
      subtitle: "Learn To Speak!",
      wordsLeft: 5,
      overview: "Words remaining today: ",
      route: "/LearningDash/EnglishToSpanish/",
      body:
        "Learn the words you're going to hear in everyday conversation, TV, and music.",
    },
    {
      tite: "Spanish To English",
      subtitle: "Learn To Listen!",
      wordsLeft: 5,
      overview: "Words remaining today: ",
      route: "/LearningDash/SpanishToEnglish/",
      body:
        "Start Learning the most useful words you can go to again and again in conversation.",
    },
    {
      tite: "Quiz",
      subtitle: "Focus On Important Words!",
      wordsLeft: 0,
      overview: "Words being tracked: ",
      route: "/LearningDash/Quiz/QuizEnglish/",
      route2: "/LearningDash/Quiz/QuizSpanish/",
      body:
        "Pick the words most important to you and spend extra time on them.",
      buttonGroup: true,
    },
    {
      tite: "Learned",
      subtitle: "Revist What You've Learned!",
      wordsLeft: 0,
      overview: "Words Learned: ",
      route: "/LearningDash/LearnedEnglish/",
      route2: "/LearningDash/LearnedSpanish/",
      body:
        "Test on what you have learned and continue mastering the language.",
      buttonGroup: true,
    },
  ];

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ height: "80vh" }}
    >
      {pageOptions.map((option, index) => {
        return (
          <DashItem
            key={`${option}${index}`}
            title={option.tite}
            subtitle={option.subtitle}
            wordsLeft={option.wordsLeft}
            overview={option.overview}
            route={option.route}
            route2={option.route2}
            buttonGroup={option.buttonGroup}
            buttonNumber={index}
            setTabValue={props.setTabValue}
          >
            {option.body}
          </DashItem>
        );
      })}
      <DashSettings />
    </Grid>
  );
};

export default LearningDash;
