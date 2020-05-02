import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";

const MaxResults = 20;

class SearchResultContainer extends Component {
    state = {
        result: [],
        filter: [],
        currentSort: "default",
        sortField: ""
    };

    // onsafe_componentWillMount()
    componentDidMount() {
        API.search()
            .then(res => {
                const mapped = res.data.results.map((e, i) => ({
                    firstName: e.name.first,
                    lastName: e.name.last,
                    picture: e.picture.large,
                    email: e.email,
                    phone: e.phone,
                    dob: e.age
                }))
                this.setState({
                    result: mapped,
                    filter: mapped
                })
            })
            .catch(err => console.log(err));
    }

    filterEmployees = () => {
        this.setState({
            filter: this.state.result.filter(person => {
                const values = Object.values(person).join("").toLowerCase().replace("http", '');

                return values.includes(this.state.search)
            })
        })
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({

            [name]: value

        }, this.filterEmployees);
    };

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Employee Directory</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <SearchForm
                            value={this.state.search}
                            handleInputChange={this.handleInputChange}
                        />
                    </div>
                </div>

                <div className="row">
                    {/* <div > */}
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="col">Photo</th>
                                <th>First Name</th>
                                <th scope="col">Last Name </th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </tbody>
                        {this.state.filter.map((item, i) =>
                            <EmployeeCard
                                picture={item.picture}
                                firstName={item.firstName}
                                lastName={item.lastName}
                                email={item.email}
                                phone={item.phone}
                                key={i + '-employee'}
                            />
                        )}

                    </table>
                </div>


            </div>
        );
    }
}

export default SearchResultContainer;