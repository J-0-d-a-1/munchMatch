class CreateSwipes < ActiveRecord::Migration[7.2]
  def change
    create_table :swipes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :dish, null: false, foreign_key: true
      t.string :direction

      t.timestamps
    end
  end
end
