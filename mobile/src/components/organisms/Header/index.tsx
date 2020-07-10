import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import * as S from './styles';

interface HeaderProps {
    text?: string;
    iconName?: string;
}

const Header: React.FC<HeaderProps> = ({
    text = 'Profile',
    iconName = 'edit-3',
}) => {
    return (
        <S.Container>
            <S.Content hasIcon={false}>
                <S.HeaderTitle>{text}</S.HeaderTitle>
            </S.Content>

            <S.Content hasIcon>
                <S.ChooseIcon>
                    <Icon name={iconName} size={17} />
                </S.ChooseIcon>
            </S.Content>
        </S.Container>
    );
};

export default Header;
