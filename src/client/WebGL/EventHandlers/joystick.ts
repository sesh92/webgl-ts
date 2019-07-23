export interface IJoystickListener {
  onLeft(): void;
  offLeft(): void;
  onRight(): void;
  offRight(): void;
}

class JoystickEvent {
  listeners: IJoystickListener[];
  side: number;

  constructor() {
    this.listeners = [];
    this.side = 0;
  }

  setDir = (value: number) => {
    if (this.side + value >= -1 && this.side + value <= 1) {
      this.side += value;
    }
  };

  keyDown = ({ code }: KeyboardEvent) => {
    this.listeners.forEach((listener: IJoystickListener) => {
      if (code === 'KeyA') {
        listener.onLeft();
      }
      if (code === 'KeyD') {
        listener.onRight();
      }
    });
  };

  keyUp = ({ code }: KeyboardEvent) => {
    this.listeners.forEach((listener: IJoystickListener) => {
      if (code === 'KeyA') {
        listener.offLeft();
      }
      if (code === 'KeyD') {
        listener.offRight();
      }
    });
  };

  init = () => {
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
  };

  subscribe = (listener: IJoystickListener) => this.listeners.push(listener);

  clear = () => {
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
    this.listeners = [];
  };
}

const Instance = new JoystickEvent();

export default Instance;
