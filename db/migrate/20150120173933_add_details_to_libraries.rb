class AddDetailsToLibraries < ActiveRecord::Migration
  def change
    add_column :libraries, :web_standard, :boolean
    add_column :libraries, :latest_version, :string
    add_column :libraries, :license, :string
    add_column :libraries, :support, :text
  end
end
