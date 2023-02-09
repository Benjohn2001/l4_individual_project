import Clock from '../Clock';
import { render } from '@testing-library/react-native'
import renderer from "react-test-renderer";

test('Check Clock working correctly',()=>{
      
    const data1 = {
        "colour": "#00afef",
        "member": "KKSw9RsMRlSBKjUy7EGOiA1NcFk2",
        "status": 5
    }
    const snap1 = { val: () => data1 };
    const snaps=[snap1]
    const clock = render(<Clock 
        locations={['a','a','a','a','a','a']}
        face={"#00afef"}
        membs={snaps}
    />)

    const domTree = renderer.create(
        <Clock 
            locations={['a','a','a','a','a','a']}
            face={"#00afef"}
            membs={snaps}
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();

    expect(clock).toBeTruthy()
})



