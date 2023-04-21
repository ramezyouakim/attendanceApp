import React from 'react';
import { Card } from 'react-native-ui-lib';

const WelcomeTile = () => {
    return (
        <>
            <Card
                flex
                height={200}
                style={{ backgroundColor: 'blue' }}
                center
                marginT-5
                onPress={() => console.log('pressed 1')}>
                <Card.Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80',
                    }}
                    style={{
                        // add this, and remove width/height of Card.Image, set them on Card
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Card>
        </>
    )

}

export default WelcomeTile

