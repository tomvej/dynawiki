import {blockType} from './constants';
import Heading from './Heading';

export default (contentBlock) => {
    if (contentBlock.getType() === blockType.HEADING) {
        return {
            component: Heading,
            editable: true,
        };
    }
    return undefined;
};
