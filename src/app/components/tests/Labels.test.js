import Labels from "../Labels";
import { render } from '@testing-library/react-native'

test('Check Labels working correctly',()=>{
    const noLabels = render(<Labels 
        radius={5}
        center={0}
        locations={['a','a','a','a','a','a']}
    />).toJSON()
    expect(noLabels["children"].length).toBe(6)
})