import { showCourseAction } from "./showCourseActions.js";

function uploadAction(ctx) {
    // ctx.session = {
    //     flow: 'upload',

    // }
    console.log("context after upload handler", ctx)

    // return showCourseAction(ctx);
}

export default uploadAction;