const appExit = (ev) => {
    console.log("event is: ", ev);
    if (ev.keyName === 'back') {
        window.tizen.application.getCurrentApplication().exit();
    }
};
export default appExit;


