import Unparser from '../src/index';

const Grammar = {
    ParserRules: [
        {name: 'main', symbols: ['foo']},
        {name: 'main', symbols: ['bar_list']},
        {name: 'foo$string$1', symbols: [{literal:'f'}, {literal:'o'}, {literal:'o'}], postprocess: (d) => d.join('')},
        {name: 'foo$ebnf$1', symbols: [/[0-9]/]},
        {name: 'foo$ebnf$1', symbols: [/[0-9]/, 'foo$ebnf$1'], postprocess: (d) => [d[0]].concat(d[1])},
        {name: 'foo', symbols: ['foo$string$1', 'foo$ebnf$1']},
        {name: 'bar_list', symbols: ['bar']},
        {name: 'bar_list', symbols: ['bar_list', {literal:','}, 'bar']},
        {name: 'bar$string$1', symbols: [{literal:'b'}, {literal:'a'}, {literal:'r'}], postprocess: (d) => d.join('')},
        {name: 'bar', symbols: ['bar$string$1']},
    ], 
    ParserStart: 'main',
};

/**
 * @todo
 * More detailed tests
 */
describe('Core Functionality', () => {
    const Table = `\na\n${new Array(100).fill(1).join('\n')}`;

    it.each`${Table}`('Should match the original RegExp', () => {
        const Instance = new Unparser({
            Rules: Grammar.ParserRules,
            Start: Grammar.ParserStart,
        });
    
        expect(Instance.Parse()).toMatch(/[a-zA-Z0-9]{3,6}/);
    });

    test('Seeding', () => {
        const Instance = new Unparser({
            Rules: Grammar.ParserRules,
            Start: Grammar.ParserStart,
        });

        Instance.SetSeed('abc');

        expect(Instance.Parse()).toMatchSnapshot();
    });
});