class CreateLibraries < ActiveRecord::Migration
  def change
    create_table :libraries do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.string :url_code
      t.string :url_docs
      t.string :image_url
      t.boolean :web_standard
      t.string :render_tech
      t.string :dependencies
      t.string :license
      t.string :support

      t.string :current_version
      t.date :first_release
      t.date :latest_release
      t.date :repo_pushed_at
      t.date :repo_created_at
      t.integer :repo_watchers_count
      t.integer :repo_stargazers_count
      t.integer :repo_forks_count
      t.integer :repo_open_issues
      t.string :repo_participation_stats
      
      t.string :meta_tags
      t.text :description
      #t.text :short

      t.timestamps null: false
    end
  end
end
