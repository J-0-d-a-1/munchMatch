# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
Category.create!([
                   { name: 'Comfort' },
                   { name: 'Indian' },
                   { name: 'Japanese' },
                   { name: 'Mexican' }
                 ])

User.create!([
               { name: 'Bob', email: 'bob@bob.com', password: 'password', is_owner: false },
               { name: 'Alice', email: 'alice@wonderland.com', password: 'password', is_owner: false },
               { name: 'Sam', email: 'sam@fisher.com', password: 'password', is_owner: true }
             ])
