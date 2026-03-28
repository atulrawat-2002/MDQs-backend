import { Markup } from "telegraf";
import { ADVANCE_SOFTWARE_ENGINEERING, CYBER_SECURITY_AND_BLOCKCHAIN, IOT_AND_SENSOR_NETWORK, MACHINE_LEARNING_AND_PYTHON_PROGRAMMING, WEB_DEVELOPMENT_USING_DOTNET } from "../../utils/constants/subjectConstants.js";
import { B_TECH, MBA, MCA } from "../../utils/constants/courseConstants.js";

export function showCourseAction(ctx) {
  ctx.reply(
    'Select course',
    Markup.inlineKeyboard([
      [Markup.button.callback('MCA', MCA)],
      [Markup.button.callback('MBA', MBA)],
      [Markup.button.callback('B.TECH', B_TECH)],
    ])
  );
}



export function subjectAction(ctx) {
    return ctx.reply(
    'Select Subjet',
    Markup.inlineKeyboard([
      [Markup.button.callback('Advance Software Engineering', ADVANCE_SOFTWARE_ENGINEERING)],
      [Markup.button.callback('Cyber Security And Blockchain', CYBER_SECURITY_AND_BLOCKCHAIN)],
      [Markup.button.callback('Iot & Sensor Networks', IOT_AND_SENSOR_NETWORK)],
      [Markup.button.callback('Web Development Using .NET', WEB_DEVELOPMENT_USING_DOTNET )],
      [Markup.button.callback('Machine Learning And Python Programming', MACHINE_LEARNING_AND_PYTHON_PROGRAMMING)],
    ])
  );
}