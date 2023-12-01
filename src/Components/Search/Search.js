import React, { Component } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { url } from './Api'
import {options} from './Api'

 class Search extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         serach: null
      }
    }
    handleOnChange = (searchData) => {
        this.setState({
            serach:searchData
        })
        console.log(this.state.serach);
        this.props.onSearchChange(searchData)
    }
    // componentDidMount(){
    //     this.loadOptions();
    // }
    loadOptions  = async(inputValue) => {
        console.log(inputValue, "inputValue")
        if(inputValue != undefined && inputValue != '') {
            try {
                const response = await fetch(`${url}?namePrefix=${inputValue}`, options);
                const result = await response.json();
                // return 
                // const cityNames = result.data.map( city => city.name);
                const searchResponse = { options: result.data.map(city => ({value: `${city.latitude} ${city.longitude}`, label: `${city.name},${city.countryCode}`}))} ;
                console.log(searchResponse);
                return searchResponse;
                // return   {
                //     options: [{value: "hyd", label: "hyderabad"}],
                //     hasMore: false
                //   }
            } catch (error) {
                console.error(error);
            }
        } else {
            return {
                options: [],
                hasMore: false
            }
        }
    }
  render() {
    return (
      <div>
        <AsyncPaginate 
        placeholder = "Search for city" 
        debounceTimeout={1000}
        value={this.state.search}
        onChange={this.handleOnChange}
        loadOptions={this.loadOptions}
        additional={{page: 1}}
        />
      </div>
    )
  }
}

export default Search
