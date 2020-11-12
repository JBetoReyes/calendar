import {configure} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

configure({adapter: new EnzymeAdapter()});

const mockGetContext = () => {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
HTMLCanvasElement.prototype.getContext = mockGetContext as any;
