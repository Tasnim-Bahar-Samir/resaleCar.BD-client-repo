import React from "react";

const Blog = () => {
  return (
    <div className="md:mx-20 mx-2">
      <div className="p-10 my-5 rounded-md border-2">
        <h2 className="text-3xl font-semibold">
          What are the different ways to manage a state in a React application?
        </h2>
        <p className="text-lg">
          There are different ways to manage a state in a react application .I am metionning some of this: <br />
          <b>1 . Communication State</b>: Communication plays a crucial role in
          storing information in different states. It covers essential aspects
          of an application such as loading spinners, error messages, pop-ups,
          and many others which showcases that a communication link has been
          formed. Communication state is the “loading phase” of the transactions
          between different states. <br />
          <b>2. Data State</b>: Data state covers information that your React
          application stores temporarily for various business functions.
          Supposedly, you are building a project management app. The information
          stored in the data state will include the following things – project
          names, contacts, details about the clients, etc. <br />
          <b>3. Control State</b>: Contrary to the state mentioned above in a
          React app, the control state does not represent the application’s
          environment. Instead, it refers to the state which the user has input
          into the app. For example, form inputs, selected items, etc. Control
          state is known to be more diverse and versatile when it comes to
          storing information.
        </p>
      </div>
      <div className="p-10 my-5 rounded-md border-2">
        <h2 className="text-3xl font-semibold">
          What are the different ways to manage a state in a React application?
        </h2>
        <p className="text-lg">
          prototypical inheritance refers to the ability to access object
          properties from another object. We use a JavaScript prototype to add
          new properties and methods to an existing object constructor. We can
          then essentially tell our JS code to inherit properties from a
          prototype. Prototypical inheritance allows us to reuse the properties
          or methods from one JavaScript object to another through a reference
          pointer function.
        </p>
      </div>

      <div className="p-10 my-5 rounded-md border-2">
        <h2 className="text-3xl font-semibold">
          What is a unit test? Why should we write unit tests?
        </h2>
        <p className="text-lg">
        A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important. In his book "Working Effectively with Legacy Code", author Michael Feathers states that such tests are not unit tests when they rely on external systems: “If it talks to the database, it talks across the network, it touches the file system, it requires system configuration, or it can't be run at the same time as any other test."
        </p>
      </div>
      <div className="p-10 my-5 rounded-md border-2">
        <h2 className="text-3xl font-semibold">React vs. Angular vs. Vue?</h2>
        <p className="text-lg">
          <b>Angular</b> is a front-end framework with lots of components,
          services, and tools. On Angular’s site, you can see that they define
          Angular as: “The modern web developer’s platform” It is developed and
          maintained by Google developers, but curiously it is not used to
          implement any of their most common products such as Search or YouTube.
          <br /> <b>React</b> is considered a UI library. They define themselves
          as: “A JavaScript library for building user interfaces” <br />
          <b>Vue.js</b> is, according to its site: “A progressive JavaScript
          framework” Vue.js is developed and led by Evan You, but also it counts
          on a huge open-source community.
        </p>
      </div>
    </div>
  );
};

export default Blog;
