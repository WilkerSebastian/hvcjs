import pt from "./lang/pt.json"
import es from "./lang/es.json"
import en from "./lang/en.json"

enum Languages {
    PT,
    ES,
    EN
}

export class Internalization {

    private currentLang: string
    private dicionary: { [key: string]: string }[]

    private static instance: Internalization;

    constructor() {

        this.currentLang = "pt"

        this.dicionary = [pt, es, en]

    }

    public translate(tag: string): string {

        if (this.currentLang == "pt")
            return this.dicionary[Languages.PT][tag]

        else if (this.currentLang == "es")
            return this.dicionary[Languages.ES][tag]

        else
            return this.dicionary[Languages.EN][tag]

    }

    public translateAndReplace(tag: string, ...args: any[]): string {

        const translate = this.translate(tag)

        let i = 0

        return translate.split("$").map((value, index) => {

            let res = value

            if (index >= 1) {

                res = args[i] + res

                i++

            }

            return res
        
        }).join("")

    }

    public static getInstance(): Internalization {

        if (!Internalization.instance) 
          this.instance = new Internalization();
        
        return this.instance;

    }

    public setLanguage(lang: string) {
        this.currentLang = lang
    }

}