import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytmutils';
import { addToCart } from '../../redux/actions/cartActions';


const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0', 
    marginBottom:10,
    width: '85%'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '46%',
    borderRadius: 2,
    height: 50,
    //color: #FFF;
    [theme.breakpoints.down('lg')]: {
        width:'44%',
    },
    [theme.breakpoints.down('sm')]: {
        width:'46%',
    }
}))


const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = product;
        
    const [quantity, setQuantity] = useState(1);
    
    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'salonidiwad998S@gmail.com'});
        let information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    return (
        <LeftContainer>
            <Image src={product.detailUrl} alt='product'/>
            
            <StyledButton onClick={() => addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />&nbsp;Add to Cart</StyledButton>
            <StyledButton onClick={() => buyNow()} style={{background: '#fb641b'}} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;