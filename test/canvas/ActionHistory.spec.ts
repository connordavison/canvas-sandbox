import { Action } from 'app/canvas/Action';
import { ActionHistory } from 'app/canvas/ActionHistory';
import { expect } from 'chai';

describe('ActionHistory', () => {
    let counter = 0;

    class IncrementAction implements Action {
        public do(): void {
            counter++;
        }

        public undo(): void {
            counter--;
        }
    }

    class SomeOtherAction implements Action {
        public do(): void { /* noop */ }
        public undo(): void { /* noop */ }
    }

    const history = new ActionHistory();
    const increment = new IncrementAction();

    beforeEach(() => {
        counter = 0;
        history.clear();
    });

    describe('#push', () => {
        it('should not execute the action', () => {
            history.push(increment);

            expect(counter).to.equal(0);
        });

        it('should be undoable', () => {
            increment.do();
            history.push(increment);
            history.undo();

            expect(counter).to.equal(0);
        });
    });

    describe('#redo / #canRedo', () => {
        it('should re-apply undone actions', () => {
            increment.do();
            history.push(increment);
            increment.do();
            history.push(increment);

            expect(counter).to.equal(2);

            history.undo();

            expect(counter).to.equal(1);

            history.redo();

            expect(counter).to.equal(2);
        })

        it('should be disabled after something new is done', () => {
            history.push(new IncrementAction());
            history.push(new IncrementAction());

            history.undo();
            history.undo();

            expect(history.canRedo()).to.be.true;

            history.push(new SomeOtherAction());

            expect(history.canRedo()).to.be.false;
        });

        it('should re-enable undo if everything was undone', () => {
            expect(history.canUndo()).to.be.false;

            history.push(new IncrementAction());

            expect(history.canUndo()).to.be.true;

            history.undo();

            expect(history.canUndo()).to.be.false;

            history.redo();

            expect(history.canUndo()).to.be.true;
        });
    });

    describe('#undo / #canUndo', () => {
        it('should enable redo', () => {
            history.push(new IncrementAction());

            expect(history.canRedo()).to.be.false;

            history.undo();

            expect(history.canRedo()).to.be.true;
        });

        it('should be disabled after everything is undone', () => {
            expect(history.canUndo()).to.be.false;

            history.push(new IncrementAction());
            history.push(new IncrementAction());

            expect(history.canUndo()).to.be.true;

            history.undo();

            expect(history.canUndo()).to.be.true;

            history.undo();

            expect(history.canUndo()).to.be.false;
        });
    });
});
