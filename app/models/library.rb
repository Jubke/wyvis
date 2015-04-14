class Library < ActiveRecord::Base
  include Transliterate
  serialize :meta_tags
  serialize :render_tech
  serialize :repo_participation_stats

  validates :name, :url, presence: true
  
  has_many :implementations, inverse_of: :library
  has_many :resources, inverse_of: :library
  has_and_belongs_to_many :visualization_types
  has_and_belongs_to_many :visualization_tasks

  before_save :fetch_github_info

  def fetch_github_info
    if has_github_repo
      
      repo = Octokit::Repository.from_url self.url_code

      client = Octokit::Client.new
      client.client_id = ENV["GITHUB_CLIENT_ID"]
      client.client_secret = ENV["GITHUB_SECRET"]
    

      begin
        # Get the weekly commit count for the 
        # repository owner and everyone else.
        # oldest (0) to most recent week (52)
        # {"all":[0,..,52],"owner":[0,..,52]}
        stats = client.participation_stats repo
        if !stats.nil?
          self.repo_participation_stats = stats.to_h;
        end
        
        # fetch repo information
        repository = client.repository repo

        self.repo_created_at = repository.created_at
        self.repo_pushed_at = repository.pushed_at
        self.repo_watchers_count = repository.watchers_count
        self.repo_stargazers_count = repository.stargazers_count
        self.repo_forks_count = repository.forks_count
        self.repo_open_issues = repository.open_issues

        # Get the latest release data 
        latest_release = client.release repo.path + '/releases/latest'
        
        self.latest_release = latest_release.published_at
        self.current_version = latest_release.tag_name
      
      # if no releases are available we try tags
      rescue Octokit::NotFound
        begin
          tags = client.tags repo
          if !tags[0].nil?
            self.current_version = tags[0].name
            latest_tagged_commit = client.commit repo, tags[0].commit.sha

            self.latest_release = latest_tagged_commit.commit.committer.date
          end

        # neither is available
        rescue Octokit::Error => e
          puts self.name
          puts e
        end
      rescue Octokit::Error => e
        puts self.name
        puts e
      end

    end
  end

  def has_github_repo
    if self.url_code.nil?
      return false
    else
      return self.url_code.include? "github"
    end
  end

  def self.fetch_github_infos

  end
end