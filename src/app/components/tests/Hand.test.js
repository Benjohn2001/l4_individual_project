import Hand from '../Hand'
import { render } from '@testing-library/react-native'

test('Check Hand working correctly',()=>{
    const data = {
        "bio": "Add a bio!",
        "email": "ts@gmail.com",
        "firstName": "Tara",
        "lastName": "Smith",
        "userName": "tdawg123"
      }
    const snap = { val: () => data };
    const hand = render(<Hand 
        index={0}
        point={{'x':2,'y':2}}
        center={0}
        member={[snap,"blue"]}
    />).toJSON()
    expect(hand["children"].length).toBe(3)
})