import DoublePuyo from '../Func/DoublePuyo';
const CREATE_PUYO = 'CREATE_PUYO';

const init= new DoublePuyo();

export const createPuyoAction = () => ({
  type: CREATE_PUYO
})

export default function(state = init, action) {
  switch (action.type) {
  case CREATE_PUYO:
    return new DoublePuyo();
  default:
    return state;
  }
}
