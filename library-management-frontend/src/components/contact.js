// src/pages/Contact.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import React from 'react';

const Contact = () => {
    const teamMembers = [
        { id: '20APSE4848', name: 'M.H.A.R.T. Vishvajith' },
        { id: '20APSE4883', name: 'KWHMRKS Elkaduwa' },
        { id: '20APSE4837', name: 'R.G.R.L. Ranathunga' },
        { id: '20APSE4983', name: 'Y.S.R.T. Silva' },
        { id: '20APSE4861', name: 'M. Aksyan Group' },
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Contact Team Members</h1>
            <div className="row">
                {teamMembers.map(member => (
                    <div className="col-md-4 mb-4" key={member.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{member.name}</h5>
                                <p className="card-text">
                                    <strong>ID:</strong> {member.id}
                                </p>
                                <a href="#" className="btn btn-primary">View Profile</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contact;
