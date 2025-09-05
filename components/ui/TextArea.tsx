import { TextInput, View, Text } from 'react-native';
import { useState } from 'react';

type autoCompletes=  'additional-name' | 'address-line1' | 'address-line2' | 'birthdate-day' | 'birthdate-full' | 'birthdate-month' | 'birthdate-year' | 'cc-csc' | 'cc-exp' | 'cc-exp-day'| 'cc-exp-month' | 'cc-exp-year' | 'cc-number' | 'country' | 'current-password' | 'email' | 'family-name' | 'given-name' | 'honorific-prefix' | 'honorific-suffix' | 'name' | 'new-password' | 'off' | 'one-time-code' | 'postal-code' | 'street-address' | 'tel' | 'username' | 'cc-family-name' | 'cc-given-name' | 'cc-middle-name' | 'cc-name' | 'cc-type' | 'nickname' | 'organization' | 'organization-title' | 'url' | 'gender' | 'name-family' | 'name-given' | 'name-middle' | 'name-middle-initial' | 'name-prefix' | 'name-suffix' | 'password' | 'password-new' | 'postal-address' | 'postal-address-country' | 'postal-address-extended' | 'postal-address-extended-postal-code' | 'postal-address-locality' | 'postal-address-region' | 'sms-otp' | 'tel-country-code' | 'tel-device' | 'tel-national' | 'username-new';
type keyboards = 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';
type autoCapitalizes = 'none' | 'sentences' | 'words' | 'characters';

interface TextAreaProps {
    title?: string,
    className?: string;
    placeholder?: string;
    numberOfLines?: number;
    multiline?: boolean;
    autoCorrect?: boolean;
    Password?: boolean;
    autoComplete?: autoCompletes;
    keyboardType?: keyboards;
    autoCapitalize?: autoCapitalizes;
    value?: string;
}
//reference https://reactnative.dev/docs/textinput

function TextArea({
    title = "Title",
    className = "",
    placeholder = "",
    numberOfLines = 1,
    multiline = false,
    autoComplete = "off",
    autoCorrect = false,
    Password = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    value = "", 
}:TextAreaProps){
    const [text, setText] = useState('');
    return(
        <View className="flex flex-col items-left gap-2 w-full">
            <Text className={`${className} font-bold`}>{title}</Text>
            <View className="border w-full border-[5px] rounded-[20px] p-4">
                <TextInput
                    multiline={multiline} // This prop enables multi-line input
                    numberOfLines={numberOfLines}
                    onChangeText={setText}
                    value={text ?? value}
                    placeholder={placeholder}
                    className={`${className} leading-tight`}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    disableKeyboardShortcuts={Password}
                    cursorColor="foreground"
                    submitBehavior='blurAndSubmit'
                    keyboardType={keyboardType}
                    secureTextEntry={Password}
                    autoCapitalize={autoCapitalize}
                    autoFocus={true}
                    passwordRules="minlength: 20,required: lower; required: upper; required: digit; required: [!#%&*=@^_];"
                />
            </View>
        </View>
    );
}

export {TextArea};