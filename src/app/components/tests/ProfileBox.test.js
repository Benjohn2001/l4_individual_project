import ProfileBox from '../ProfileBox';
import renderer from "react-test-renderer";

test('Check ProfileBox renders correctly',()=>{
      const domTree = renderer.create(
        <ProfileBox 
            name="joe"
            username="jb"
            bio="joeb"
        />
        ).toJSON();
      expect(domTree).toMatchSnapshot();
})