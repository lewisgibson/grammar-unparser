import RandExpression from 'randexp';

interface ICtorOpts {
    OverrideRules?: Record<string, () => any>;
    Rules: Record<string, any>[];
    Start: string;
    MaxStack?: number;
    MaxLoops?: number;
    Filter?: (Rule: any) => boolean;
}

export default class Parser {
    private readonly Options: Partial<ICtorOpts> = {
        OverrideRules: {},
        Rules: [],
        Start: 'ParserStart',
        MaxStack: 25,
        MaxLoops: 500,
        Filter: () => true,
    };

    private Stack: any[];
    private Output: string = '';
    private StopRecusiveRules: boolean = false;

    public constructor(Override: ICtorOpts) {
        Object.assign(this.Options, Override);
        this.Stack = [this.Options.Start];
    }

    private RandInt = (Range: number) => Math.floor(Math.random() * Range);

    private RandomArrayElement = <T>(Arr: T[]) => {
        const Idx = this.RandInt(Arr.length);
        const Item = Arr[Idx];
        return Item;
    }

    private SelectRule = (RuleName: string) => {
        const Rules = this.Options.Rules.filter(({ name }) => name === RuleName);
        if(Rules.length === 0) throw new Error(`Nothing matches rule: ${RuleName}!`);

        const Filtered = Rules.filter(Rule => {
            if(!this.Options.Filter(Rule)) return false;
            if(this.StopRecusiveRules || this.Stack.length > this.Options.MaxStack) return !Rule.symbols.includes(RuleName);
            return true;
        });

        return this.RandomArrayElement(Filtered);
    }

    public Parse = () => {
        let Count = 0;
        
        while(this.Stack.length > 0){
            Count++;

            if(!this.StopRecusiveRules && Count > this.Options.MaxLoops) this.StopRecusiveRules = true;

            const RuleName = this.Stack.pop();
            const Overrides = Object.keys(this.Options.OverrideRules);

            if(Overrides.includes(RuleName)) this.Stack.push({ literal: this.Options.OverrideRules[RuleName]() });
            else if(typeof RuleName === 'string') this.Stack = [...this.Stack, ...(this.SelectRule(RuleName).symbols)];
            else if(RuleName.test) this.Output += new RandExpression(RuleName).gen();
            else if(RuleName.literal)this.Output += RuleName.literal;
        }
    
        return this.Output;
    }
}