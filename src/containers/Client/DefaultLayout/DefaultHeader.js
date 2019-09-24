import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppSearchBar, UserMenu } from '_components';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand } from '@coreui/react';
import logo from '../../../assets/img/brand/logo.svg'
import * as actions from '../../../_actions/actions.js';
import { connect } from 'react-redux';
import { searchService } from '_services/search.services.js';
import { commons } from '../../../_helpers/commons.js';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const mapStateToProps = store => ({
	searchTerm: store.headerSearchComp.searchTerm,
	searchCriterias: store.headerSearchComp.searchCriterias,
	results: store.headerSearchComp.searchResults,
})

const mapDispatchToProps = (disptach) => ({
	updateSearchResults: (e) => disptach(actions.updateHeaderSearchCompSearchResults(e)),
})

/**
 * Header navigation bar definition fo client layout
 */
class DefaultHeader extends Component {
	
	constructor(props){
		super(props)
		this.updateSearchResults = this.props.updateSearchResults.bind(this)
	}

    isLoggedIn(){
	  return localStorage.getItem('session_id') 
	  	&& localStorage.getItem('session_id') !== 'undefined';
    }

    onHeaderSearchFocused(){
    	this.displaySearchResults()
    }
    
    initAutoComplete(e){
    	let searchTerm = e.target.value
    	var s = []
    	s.push(e.target)
    	
    	// fire query only by 2 caracs
    	if(searchTerm.length > 0 && searchTerm.length%2 == 0){
    		let wc = commons.getWorkingContainerId()
    		searchService
				.searchContainerMemberByLoginLike(searchTerm, wc)
				.then(response => {
					if(response && response.data && response.data.length > 0) {
						setAutocompleteData(s[0], response.data)
					}
					else {
						noAutoCompleteData(s[0])
					}
				})  
    	}
    	else if(searchTerm.length == 0){
        	closeAllLists();
    	}
    }
    
    render() {
    	var json = localStorage.getItem('workingContainer'),
    		wc = JSON.parse(json),
        	container = wc.name,
        	isAdmin = commons.isAdministrator()
        
        var adminMenu = ''
        if(isAdmin){
        	adminMenu = (
    			 <NavItem className="px-3">
                    <NavLink to="/appVersionHistory" className="nav-link" >Manager</NavLink>
                </NavItem>
        	)
        }
        	
        return (
            <React.Fragment>
                <AppNavbarBrand className="d-lg-down-none navbrand-jsoagger-logo"
                    full={{ src: logo, width: 180, height: 55, alt: 'JSOAGGER Logo' }}
                    minimized={{ src: logo, width: 30, height: 30, alt: 'JSOAGGER Logo' }}/>

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3"/>
                
                    <div className="autocomplete">
                    	<input className="myautocompleteInput__1" 
                    		type="text" 
                    		name="myCountry"
                    		onChange={e => this.initAutoComplete(e)}
                    		autocomplete="off"
                    		placeholder="Search for ..."/>
                   </div>
                </Nav>

                <Nav className="ml-auto" navbar>
                     <NavItem className="px-3">
                        <NavLink to="#" className="btn btn-danger" ><i className="fa fa-plus fa-md"></i> New item</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/c/home" className="nav-link" >Home</NavLink>
                    </NavItem>
                    
                   {adminMenu}
	                
	                <NavItem className="jsoagger-container-location">
	                    <NavLink to="/c/switchContainers" className="nav-link">
	                        <i className="jsoagger-header-logo"></i>
	                        <span><strong>{container}</strong></span>
	                    </NavLink>
	                </NavItem>
	                
                    <UserMenu />
                </Nav>
        </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps) (DefaultHeader);


const noAutoCompleteData = (inp) => {
	closeAllLists();
	var a, b;
	  
	a = document.createElement("DIV");
    a.setAttribute("id", inp.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    inp.parentNode.appendChild(a);
    
    b = document.createElement("DIV");
    /*make the matching letters bold:*/
    b.innerHTML = "<span class='autocomplete-no-items'><strong>No items found</strong></span>";
    a.appendChild(b);
}

const setAutocompleteData = (inp, arr) => {
	  // close previously opened list
	  closeAllLists();

	  /*the autocomplete function takes two arguments,
	  the text field element and an array of possible autocompleted values:*/
	  var currentFocus, i, a, b;
	  
	  a = document.createElement("DIV");
      a.setAttribute("id", inp.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      inp.parentNode.appendChild(a);
	  
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
    	  var lp = arr[i].businessType.logicalPath
    	  if(lp.startsWith('io.github.jsoagger.people.Party/Person')){
	          /*create a DIV element for each matching element:*/
	          b = document.createElement("DIV");
	          /*make the matching letters bold:*/
	          b.innerHTML = "<strong>"  + arr[i].links.owner.firstName + " " + arr[i].links.owner.lastName  + "</strong>";
	          /*insert a input field that will hold the current array item's value:*/
	          b.innerHTML += "<input type='hidden' value='" + arr[i].links.owner.firstName + "'>";
    	  }
    	  else {
    		  /*create a DIV element for each matching element:*/
	          b = document.createElement("DIV");
	          /*make the matching letters bold:*/
	          b.innerHTML = "<strong>"  + arr[i].links.owner.name + "</strong>";
	          /*insert a input field that will hold the current array item's value:*/
	          b.innerHTML += "<input type='hidden' value='" + arr[i].links.owner.name + "'>";
    	  }
    	  
    	  /*execute a function when someone clicks on the item value (DIV element):*/
          var idobject = arr[i].attributes.id
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              var url0 = "/#/c/userDetails/" + idobject
              var url1 = "/#/c/profile/" + idobject
              
              if(window.location.href.includes('/userDetails/')){
            	  window.location.href = url1
              }
              else {
            	  window.location.href = url0
              }
          });
          a.appendChild(b);
      }
	  function addActive(x) {
	    /*a function to classify an item as "active":*/
	    if (!x) return false;
	    /*start by removing the "active" class on all items:*/
	    removeActive(x);
	    if (currentFocus >= x.length) currentFocus = 0;
	    if (currentFocus < 0) currentFocus = (x.length - 1);
	    /*add class "autocomplete-active":*/
	    x[currentFocus].classList.add("autocomplete-active");
	  }
	  function removeActive(x) {
	    /*a function to remove the "active" class from all autocomplete items:*/
	    for (var i = 0; i < x.length; i++) {
	      x[i].classList.remove("autocomplete-active");
	    }
	  }
	  
	  /*execute a function when someone clicks in the document:*/
	  document.addEventListener("click", function (e) {
	      closeAllLists(e.target);
	  });
}

const closeAllLists = () => {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      x[i].parentNode.removeChild(x[i]);
    }
}
