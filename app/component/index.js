/**
 * Created by willstreeter on 8/28/17.
 */
export default ( text = 'HELLO WORLD from FIRST TRY') => {
    const element = document.createElement('div');

    element.innerHTML = text;

    return element;
};

