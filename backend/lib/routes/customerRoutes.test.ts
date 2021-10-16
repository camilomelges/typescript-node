import * as customerRoutes from "./customerRoutes"
// @ponicode
describe("router", () => {
    let inst: any

    beforeEach(() => {
        inst = new customerRoutes.CustomerRoutes()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.router("ponicode.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.router("https://api.telegram.org/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.router(12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.router(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.router("http://www.croplands.org/account/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.router(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})
