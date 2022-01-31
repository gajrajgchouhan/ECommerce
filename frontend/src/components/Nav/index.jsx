import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectCurrentUser } from "../../app/auth/auth.selectors";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signOutSuccess } from "../../app/auth/auth.actions";
import { auth, googleProvider } from "../../app/firebase/config";
import { signInWithPopup, signOut } from "@firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { addToSearch } from "../../app/features/search";

const Nav = ({ cartItems }) => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const infoRef = useRef();
    const loc = useLocation();
    const [icon, setIcon] = useState("bars");
    const products = useSelector((state) => state.products);
    const nav = useNavigate();

    useEffect(() => infoRef.current.classList.remove("show"), [loc]);

    const signInGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const uid = auth.currentUser.uid;
            const { displayName, photoURL, email } = auth.currentUser;
            dispatch(
                signInSuccess({ name: displayName, url: photoURL, email })
            );
            // unique user ID from the auth variable, and use it to
            // control what data a user can access.
        } catch (error) {
            alert(error);
        }
    };

    const signOutGoogle = async () => {
        try {
            const result = await signOut(auth);
            dispatch(signOutSuccess());
        } catch (error) {
            alert(error);
        }
    };

    const [search, setSearch] = useState("");
    const searchChangeHandler = (e) => setSearch(e.target.value);
    const searchSubmitHandler = (e) => {
        if (e.code !== "Enter") return;

        let search_ids = [];
        products.forEach(({ title, id }) => {
            if (title.toLowerCase().includes(search.toLowerCase())) {
                search_ids.push(id);
            }
        });
        console.log("searchSubmit");
        dispatch(addToSearch(search_ids));
        setSearch("");
        nav("/", { replace: true, state: { search: "true" } });
    };

    // useEffect(() => console.log(search), [search]);

    return (
        <NavStyle>
            <Link to="/">
                <Logo>LA Collection</Logo>
            </Link>
            <Bars
                onClick={(e) => {
                    e.stopPropagation();
                    if (infoRef.current.classList.contains("show")) {
                        infoRef.current.classList.remove("show");
                        setIcon("bars");
                    } else {
                        infoRef.current.classList.add("show");
                        setIcon("cross");
                    }
                }}
            >
                {icon === "cross" ? (
                    <FontAwesomeIcon size="2x" icon={faTimes} />
                ) : (
                    <FontAwesomeIcon size="2x" icon={faBars} />
                )}
            </Bars>
            <InfoStyle ref={infoRef}>
                <Search className="col">
                    <input
                        type="text"
                        value={search}
                        onChange={searchChangeHandler}
                        onKeyDown={searchSubmitHandler}
                        placeholder="Search"
                    ></input>
                </Search>
                {currentUser === null ? (
                    <Button onClick={signInGoogle} className="col">
                        Login
                    </Button>
                ) : (
                    <>
                        <ProfilePic
                            className="col"
                            src={currentUser.url}
                            alt="user"
                        />
                        <Button onClick={signOutGoogle} className="col">
                            Logout
                        </Button>
                    </>
                )}
                <Link to="/cart">
                    <Button className="col">
                        <FontAwesomeIcon
                            className="cart"
                            icon={faShoppingCart}
                        />
                        Cart: {cartItems}
                    </Button>
                </Link>
            </InfoStyle>
        </NavStyle>
    );
};

const NavStyle = styled.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: black;
    color: white;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    font-weight: bold;
    font-size: 0.875rem;
`;

const InfoStyle = styled.div`
    display: flex;
    width: clamp(80%, 500px, 90%);
    justify-content: flex-end;
    .col {
        margin: 0.5rem;
    }
    align-items: center;
    @media screen and (max-width: 767.97px) {
        transition: opacity 1s linear;
        opacity: 0;
        height: 0;
        width: 0;
        overflow: hidden;
        &.show {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            background-color: inherit;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            height: 100vh;
            width: 100%;
            margin: 0 auto;
            z-index: 100;
            opacity: 1;
        }
    }
`;

const Logo = styled.div`
    font-size: 1.5rem;
    cursor: pointer;
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    input {
        outline: none;
        border: none;
        border-radius: 20px;
        padding: 8px;
        font-family: inherit;
    }
}
`;

const Button = styled.div`
    border: 1px solid white;
    padding: 0.7rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: ease-in-out 300ms;
    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
    .cart {
        margin-right: 0.5rem;
    }
`;

const ProfilePic = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
`;

const Bars = styled.div`
    position: absolute;
    display: block;
    right: 0;
    margin-top: auto;
    padding-right: inherit;
    cursor: pointer;
    z-index: 111;
    @media screen and (min-width: 767.97px) {
        display: none;
    }
`;

const mapStatetoProps = (state) => {
    return {
        cartItems: state.cart.count,
    };
};

export default connect(mapStatetoProps)(Nav);
