import ClockHand from '../ClockHand';
import { render } from '@testing-library/react-native'

test('Check ClockHand working correctly',()=>{
    const data1 = {
        "bio": "Add a bio!",
        "email": "ts@gmail.com",
        "firstName": "Tara",
        "lastName": "Smith",
        "userName": "tdawg123"
      }
    const snap1 = { val: () => data1 };
    const snap2 = { val: () => data1 };
    const snap3 = { val: () => data1 };
    const snaps=[snap1,snap2,snap3]
    const clockhand = render(<ClockHand 
        radius={5}
        center={0}
        members={snaps}
    />).toJSON()
    console.log(clockhand,"not sure how to test renders 3 hands")
})