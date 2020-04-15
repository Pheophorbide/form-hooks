import React from 'react';
import {memo} from 'react';
import {Form} from "./Form";

function AppComp() {
  return (
    <div className="layout">
      <Form title={"Форм"}/>
    </div>
  );
}

export const App = memo(AppComp);
