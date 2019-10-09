import InstructionBuffer, { opCodes } from './InstructionBuffer'
// import Keyboard from './keyboard'
const URLS = {
  // TODO: Get this URL from a configuration file / environment variable
  BASE : 'https://localhost',
  VB_START : '/virtual_browser/start',
  VB_STOP : '/virtual_browser/stop'
}

// TODO: move this class to turtus-lib repo
export default class VirtualBrowserController {
  constructor(client){
    this.vbClient = client
    // TODO: Not sure what the following is for yet
    // this.keyboard = new Keyboard(input)
  }

  static async createInstance(roomId){
    // create the browser
    const url = URLS.BASE + URLS.VB_START + (roomId ? `?rid=${roomId}`: '')
    const result = await fetch(url)
    return result.status > 199 && result.status < 300
  }

  mouseUp(x, y, btn){
    this.vbClient.send(JSON.stringify({
      type : 'mouseUp',
      args : [x, y, btn]
    }))
  }
  /**
   * 
   * @param {Number} x x-position of mouse
   * @param {Number} y y-position of mouse
   * @param {1|2|3|4|5|6|7|8|9} btn Left (1), middle (2), right (3), middle-up (4), middle-down (5) \
   * middle-left (6), middle-right (7), browser-back (8), browser-forward (0)
   */
  mouseDown(x, y, btn){
    console.log('MouseDown', x, y, btn)
    this.vbClient.send(JSON.stringify({
      type : 'mouseDown',
      args : [x, y, btn]
    }))
  }
  mouseMove(x, y){
    // if(!vidFocus) return false;
    // const inst = new InstructionBuffer(opCodes.MOUSE_MOVE, 4);
    // inst.writeUint16(x);
    // inst.writeUint16(y);
    this.vbClient.send(JSON.stringify({
      type : 'mouseMove',
      args : [x, y]
    }))
  }
  keyDown(key){
    // if(!vidFocus) return false;
    // const inst = new InstructionBuffer(opCodes.KEY_DOWN, 2);
    // inst.writeUint16(key);
    this.vbClient.send(JSON.stringify({
      type: 'keyDown',
      args : [key],
    }))
  }

  keyUp(key){
    // if(!vidFocus) return false;
    // const inst = new InstructionBuffer(opCodes.KEY_UP, 2);
    // inst.writeUint16(key);
    this.vbClient.send(JSON.stringify({
      type: 'keyUp',
      args : [key],
    }))
  }
}