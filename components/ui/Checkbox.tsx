import { useState } from 'react';
import { TouchableWithoutFeedback, View, Text} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Checkbox(){
    const [checked, setChecked] = useState(false);

    return(
        <>
            <TouchableWithoutFeedback
                onPress={() => setChecked(!checked)} 
            >
                <View
                    className={`rounded-[30%] p-1`} 
                    style={{
                        borderWidth: 2,
                        borderColor: checked ? "#3366CC" : "black",
                        backgroundColor: checked ? "#3366CC" : "#00000000"
                    }}
                >
                    {checked ? (<>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" >
                            <Path
                                d="M20 6L9 17l-5-5"
                                stroke={"white"}
                                strokeWidth={5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </>):(<>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" >
                            <Path
                                d="M20 6L9 17l-5-5"
                                stroke={"#00000000"}
                                strokeWidth={5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </>)} 
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}