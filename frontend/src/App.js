import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import Header from "./shared/componets/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import LearningDash from "./pages/LearningDash/LearningDash";
import EnglishToSpanish from "./pages/LearningPages/EnglishToSpanish/EnglishToSpanish";
import QuizEnglish from "./pages/LearningPages/Quiz/QuizEnglish";
import QuizSpanish from "./pages/LearningPages/Quiz/QuizSpanish";
import LearnedEnglish from "./pages/LearningPages/Learned/LearnedEnglish";
import LearnedSpanish from "./pages/LearningPages/Learned/LearnedSpanish";
import SpanishToEnglish from "./pages/LearningPages/SpanishToEnglish/SpanishToEnglish";
import theme from "./shared/themes/theme";
import { AuthContext } from "./shared/context/auth-context";
import AddEnglishVocab from "./pages/LearningPages/component/AddEnglishVocab";
import AddSpanishVocab from "./pages/LearningPages/component/AddSpanishVocab";

import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const [tabValue, setTabValue] = useState(false);
  const { token, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/LearningDash" exact>
          <LearningDash setTabValue={setTabValue} />
        </Route>
        <Route path="/LearningDash/EnglishToSpanish/" exact>
          <EnglishToSpanish />
        </Route>
        <Route path="/LearningDash/SpanishToEnglish/" exact>
          <SpanishToEnglish />
        </Route>
        <Route path="/LearningDash/Quiz/QuizEnglish/" exact>
          <QuizEnglish setTabValue={setTabValue} />
        </Route>
        <Route path="/LearningDash/Quiz/QuizSpanish/" exact>
          <QuizSpanish setTabValue={setTabValue} />
        </Route>
        <Route path="/LearningDash/LearnedEnglish/" exact>
          <LearnedEnglish setTabValue={setTabValue} />
        </Route>
        <Route path="/LearningDash/LearnedSpanish/" exact>
          <LearnedSpanish setTabValue={setTabValue} />
        </Route>
        <Route path="/LearningDash/AddEnglishVocab/" exact>
          <AddEnglishVocab setTabValue={setTabValue} />
        </Route>
        <Route path="/LearningDash/AddSpanishVocab/" exact>
          <AddSpanishVocab setTabValue={setTabValue} />
        </Route>
        <Redirect to="/LearningDash/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Header tabValue={tabValue} setTabValue={setTabValue} />
          <main>{routes}</main>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
