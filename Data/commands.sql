-- SQLite

create table if not exists contact_form (Customer_Name primary key, Loan_Limit real not null, 
                                         Ongoing_Loan real not null, Payment_Frequency integer not null);

