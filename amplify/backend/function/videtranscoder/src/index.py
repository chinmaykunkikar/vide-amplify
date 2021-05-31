import logging
import os
import subprocess
import urllib.parse
from pathlib import Path
from shutil import copyfile

# set up logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def run_command(command):
    command_list = command.split(" ")

    try:
        subprocess.run(command_list, stdout=subprocess.PIPE)
    except Exception as e:
        logger.error(f"Exception: {e}")
        return False
    return True

def handler(event, context):

    # configurations
    home_path = "/var/task/"
    tmp_path = "/tmp/"
    scriptname = f"{tmp_path}create-vod-hls.sh"
    bucket_down = event["Records"][0]["s3"]["bucket"]["name"]
    bucket_up = "vide103713-staging/public/output"
    keyname = urllib.parse.unquote_plus(
        event["Records"][0]["s3"]["object"]["key"], encoding="utf-8"
    )
    filename = Path(keyname).name
    filename_base = Path(keyname).stem
    tmp_file_path = f"{tmp_path}{filename}"
    tmp_output_dir = f"{tmp_path}{filename_base}"
    script_cmd_str = f"{scriptname} {tmp_file_path} {tmp_output_dir}"
    s3down_cmd_str = f"/opt/aws s3 cp s3://{bucket_down}/{keyname} {tmp_path}"
    s3sync_cmd_str = (
        f"/opt/aws s3 sync {tmp_output_dir}/ s3://{bucket_up}/{filename_base}/"
    )

    run_command(f"rm -rf {tmp_path}*")

    # copy file to /tmp and add execute access (755)
    copyfile(f"{home_path}create-vod-hls.sh", scriptname)
    os.chmod(scriptname, 0o755)

    # download file to lambda
    run_command(s3down_cmd_str)

    # transcode file
    run_command(script_cmd_str)

    # upload transcoded output
    run_command(s3sync_cmd_str)

    logger("Successfully transcoded")

    return True