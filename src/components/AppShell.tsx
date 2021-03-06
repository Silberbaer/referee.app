import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, useHistory } from "react-router";
import loadable from "@loadable/component";
import Menu from "./Menu";
import Loading from "./Loading";
import "./AppShell.css";
import LanguagePicker from "./LanguagePicker";
import Item from "./Item";
import TestDataProvider from "../context/TestDataProvider";
import About from "./Info";
import us from "../img/us.svg";
import de from "../img/de.svg";
import es from "../img/es.svg";
import Tracking from "./Tracking";
import useAnalytics from "../hooks/useAnalytics";

const HandballRules = loadable(() => import("./HandballRules"), {
  fallback: <Loading />,
});

const RulesTest = loadable(() => import("./rules-test/RulesTest"), {
  fallback: <Loading />,
});

const Stats = loadable(() => import("./stats/Stats"), {
  fallback: <Loading />,
});

const AppShell: FunctionComponent = () => {
  const { t } = useTranslation();
  const { listen } = useHistory();
  const { updateConfig } = useAnalytics();

  useEffect(() => listen((location) => {
    updateConfig({
      anonymize_ip: true,
      page_path: location.pathname,
    });
  }), []);

  return (
    <div id="page-wrapper">
      <Menu />
      <div id="page-body">
        <Tracking />
        <header>
          <h1>{t("app.title")}</h1>
          <LanguagePicker>
            <Item code="en">
              <img src={us} alt="English" />
              <span>English</span>
            </Item>
            <Item code="de">
              <img src={de} alt="Deutsch" />
              <span>Deutsch</span>
            </Item>
            <Item code="es">
              <img src={es} alt="Español" />
              <span>Español</span>
            </Item>
          </LanguagePicker>
        </header>
        <TestDataProvider>
          <Route path="/" component={RulesTest} exact />
          <Route path="/rules" component={HandballRules} />
          <Route path="/stats" component={Stats} />
          <Route path="/about" component={About} />
        </TestDataProvider>
      </div>
    </div>
  );
};

export default AppShell;
